import { google } from "@ai-sdk/google"
import { streamText, convertToModelMessages, UIMessage, stepCountIs } from "ai"
import { z } from "zod"

interface MessagePart {
  type: string
  mediaType?: string
  url?: string
  filename?: string
}

interface AgentResponse {
  data?: {
    id?: string
    extractedData?: unknown
    [key: string]: unknown
  }
  [key: string]: unknown
}

interface RequestBody {
  messages: UIMessage[]
  userId: string
}

const analyzeReceiptSchema = z.object({
  justification: z
    .string()
    .describe(
      "Breve explicación de por qué se está analizando este documento."
    ),
})

export async function POST(req: Request) {
  const body = (await req.json()) as RequestBody
  const { messages, userId } = body

  console.log("Chat request for user:", userId)

  const modelMessages = await convertToModelMessages(messages)

  const result = streamText({
    model: google("gemini-3-flash-preview"),
    system: `Eres VanTax, un asistente financiero experto en impuestos mexicanos. 
    Tu objetivo es ayudar a los usuarios con sus dudas fiscales y financieras.
    
    REGLA CRÍTICA: Cuando un usuario suba una imagen de un ticket, factura o recibo de compra, DEBES llamar a la herramienta 'analyze_receipt'. 
    No intentes analizar los detalles del ticket (como deducibilidad o artículos específicos) por tu cuenta si hay una imagen disponible, usa la herramienta.
    
    Una vez que la herramienta te devuelva el análisis (que incluye categoría, deducibilidad, artículo de la LISR y advertencias), explícaselo al usuario de forma amable y profesional.`,
    messages: modelMessages,
    stopWhen: stepCountIs(5),
    tools: {
      analyze_receipt: {
        description:
          "Analiza un ticket de compra usando el agente especializado de VanTax para determinar su impacto fiscal.",
        inputSchema: analyzeReceiptSchema,
        execute: async (
          params: z.infer<typeof analyzeReceiptSchema>
        ): Promise<Record<string, unknown>> => {
          void params

          if (!userId) {
            return {
              error:
                "No se ha proporcionado un ID de usuario. Asegúrate de estar logueado.",
            }
          }

          const lastMessageWithImage = [...messages].reverse().find((m) =>
            m.parts?.some((p) => {
              const part = p as MessagePart
              return (
                part.type === "file" && part.mediaType?.startsWith("image/")
              )
            })
          )

          const part = lastMessageWithImage?.parts
            ?.map((p) => p as MessagePart)
            .find((p) => p.type === "file" && p.mediaType?.startsWith("image/"))

          if (!part?.url) {
            return {
              error:
                "No se encontró ninguna imagen de ticket en el historial de chat para analizar.",
            }
          }

          try {
            const formData = new FormData()

            let fileBlob: Blob
            if (part.url.startsWith("data:")) {
              const [meta, base64Data] = part.url.split(",")
              const mimeType = meta.split(":")[1].split(";")[0]
              const buffer = Buffer.from(base64Data, "base64")
              fileBlob = new Blob([buffer], { type: mimeType })
            } else {
              const response = await fetch(part.url)
              fileBlob = await response.blob()
            }

            formData.append("file", fileBlob, part.filename ?? "ticket.jpg")

            const backendUrl = process.env.NEXT_PUBLIC_BACKAPI
            if (!backendUrl) {
              return { error: "La URL del servidor no está configurada." }
            }

            const apiUrl = `${backendUrl}/users/${userId}/business-transactions`
            console.log("Calling agent API:", apiUrl)

            const apiRes = await fetch(apiUrl, {
              method: "POST",
              body: formData,
            })

            if (!apiRes.ok) {
              const errorText = await apiRes.text()
              console.error("Agent API error:", errorText)
              return {
                error: `El agente de análisis reportó un error: ${apiRes.statusText}`,
              }
            }

            const responseData = (await apiRes.json()) as AgentResponse
            console.log("Agent analysis complete:", responseData.data?.id)

            return (responseData.data?.extractedData ??
              responseData.data ??
              responseData) as Record<string, unknown>
          } catch (error) {
            console.error("Error calling business-transactions agent:", error)
            return {
              error:
                "Hubo un fallo en la conexión con el servicio de análisis fiscal.",
            }
          }
        },
      },
    },
  })

  return result.toUIMessageStreamResponse()
}
