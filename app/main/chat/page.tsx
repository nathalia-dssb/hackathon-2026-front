"use client"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { GlassCard } from "../../../components/dashboard/glass-card"
import { ScrollText, SendHorizontal, User, Bot, Image as ImageIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

const Page = () => {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      body: {
        userId: typeof window !== "undefined" ? localStorage.getItem("userId") : null,
      },
    }),
  })
  const [input, setInput] = useState("")
  const [files, setFiles] = useState<FileList | null>(null)
  const [previews, setPreviews] = useState<string[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Cleanup previews on unmount
  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [previews])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (!selectedFiles) return

    setFiles(selectedFiles)
    
    // Revoke old previews
    previews.forEach((url) => URL.revokeObjectURL(url))
    
    const newPreviews = Array.from(selectedFiles).map((file) =>
      URL.createObjectURL(file)
    )
    setPreviews(newPreviews)
  }

  const removeFiles = () => {
    setFiles(null)
    previews.forEach((url) => URL.revokeObjectURL(url))
    setPreviews([])
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleSubmit = () => {
    if ((!input.trim() && !files) || status === "streaming" || status === "submitted")
      return
    
    sendMessage({
      text: input,
      files: files || undefined,
    })
    
    setInput("")
    removeFiles()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const isResponding = status === "streaming" || status === "submitted"

  return (
    <div className="flex h-[calc(100svh-112px)] flex-col gap-4 px-0 pb-4 md:px-4">
      <header className="flex flex-col gap-1 py-4">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <ScrollText className="text-blue-400" />
          Chat con VanTax
        </h1>
        <p className="text-sm text-blue-200/60">
          Pregúntame cualquier duda sobre tus gastos, deducciones o fiscalidad.
        </p>
      </header>

      <div
        ref={scrollRef}
        className="scrollbar-thin scrollbar-thumb-blue-500/20 flex-1 space-y-4 overflow-y-auto pr-2"
      >
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <GlassCard className="max-w-md py-10 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
                <Bot className="text-blue-400" />
              </div>
              <p className="mb-2 text-blue-200/80">
                ¡Hola! Soy tu asistente financiero.
              </p>
            </GlassCard>
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "flex items-start gap-3",
                m.role === "user" ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div
                className={cn(
                  "shrink-0 rounded-full p-2",
                  m.role === "user" ? "bg-blue-400/20" : "bg-white/10"
                )}
              >
                {m.role === "user" ? (
                  <User size={18} className="text-blue-400" />
                ) : (
                  <Bot size={18} className="text-white" />
                )}
              </div>
              <GlassCard
                className={cn(
                  "max-w-[80%] px-4 py-3",
                  m.role === "user"
                    ? "rounded-tr-none border-blue-400/30 bg-blue-400/10"
                    : "rounded-tl-none"
                )}
              >
                <div className="flex flex-col gap-2">
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    {m.parts.map((part, i) => {
                      if (part.type === "text") {
                        return <span key={i}>{part.text}</span>
                      }
                      if (part.type === "file" && part.mediaType?.startsWith("image/")) {
                        return (
                          <img
                            key={i}
                            src={part.url}
                            alt={part.filename ?? "Attachment"}
                            className="max-h-60 rounded-lg object-contain border border-white/10 mt-2"
                          />
                        )
                      }
                      return null
                    })}
                  </div>
                </div>
              </GlassCard>
            </div>
          ))
        )}
        {isResponding &&
          messages[messages.length - 1]?.role !== "assistant" && (
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-white/10 p-2">
                <Bot size={18} className="text-white" />
              </div>
              <GlassCard className="animate-pulse rounded-tl-none px-4 py-3">
                <div className="h-2 w-12 rounded bg-white/20"></div>
              </GlassCard>
            </div>
          )}
      </div>

      <div className="flex flex-col gap-2">
        {previews.length > 0 && (
          <div className="flex flex-wrap gap-2 px-2">
            {previews.map((url, i) => (
              <div key={i} className="relative group">
                <img
                  src={url}
                  alt="Preview"
                  className="h-20 w-20 object-cover rounded-lg border border-white/20"
                />
                <button
                  onClick={removeFiles}
                  className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="relative mt-auto">
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-blue-200/40 hover:text-blue-400 transition-colors"
          >
            <ImageIcon size={20} />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu mensaje..."
            className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pr-14 pl-12 transition-all placeholder:text-blue-200/20 focus:ring-2 focus:ring-blue-500/40 focus:outline-none"
          />
          <button
            onClick={handleSubmit}
            disabled={(!input.trim() && !files) || isResponding}
            className="absolute top-2 right-2 rounded-xl bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600 disabled:bg-white/10 disabled:opacity-50"
          >
            <SendHorizontal size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page
