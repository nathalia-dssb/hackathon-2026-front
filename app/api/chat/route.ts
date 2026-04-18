import { google } from "@ai-sdk/google"
import { streamText, convertToModelMessages } from "ai"

export async function POST(req: Request) {
  const { messages } = await req.json()

  const modelMessages = await convertToModelMessages(messages)

  const result = streamText({
    model: google("gemini-3-flash-preview"),
    messages: modelMessages,
  })

  return result.toUIMessageStreamResponse()
}
