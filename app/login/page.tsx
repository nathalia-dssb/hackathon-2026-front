"use client"

import Link from "next/link"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/dashboard/glass-card"
import { AnimatedBackground } from "@/components/landing/AnimatedBackground"
import { FloatingElements } from "@/components/landing/FloatingElements"
import { ArrowRight, LogIn } from "lucide-react"

const logo = "/Imagenes/vantax_logo.svg"

const Page = () => {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12"
      style={{ backgroundColor: "#02011A" }}
    >
      <AnimatedBackground />
      <FloatingElements />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="mb-8 flex flex-col items-center">
          <Link href="/">
            <motion.img
              src={logo}
              alt="VanTax MX"
              className="h-10 sm:h-12"
              animate={{
                filter: [
                  "drop-shadow(0 0 0px rgba(1, 117, 217, 0.7))",
                  "drop-shadow(0 0 10px rgba(1, 117, 217, 0.5))",
                  "drop-shadow(0 0 0px rgba(1, 117, 217, 0.7))",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-white">
            Bienvenido de nuevo
          </h1>
          <p className="mt-2 text-sm text-[#94A3B8]">
            Ingresa tus credenciales para acceder a tu panel
          </p>
        </div>

        <LoginForm />

        <p className="mt-8 text-center text-sm text-[#94A3B8]">
          ¿No tienes una cuenta?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-[#0175D9] transition-colors hover:text-blue-400"
          >
            Regístrate ahora
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

function LoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/backend-api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const result = await response.json()

      if (response.status === 201 || response.status === 200) {
        if (result.data && result.data.id) {
          localStorage.setItem("userId", result.data.id)
          localStorage.setItem("userEmail", result.data.email)
        }
        router.push("/main/chat")
      } else {
        alert(result.message || "Credenciales incorrectas")
      }
    } catch (error) {
      console.error("Error en el login:", error)
      alert("Error de comunicación con el servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <GlassCard className="border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-xs font-bold tracking-widest text-[#94A3B8] uppercase"
          >
            Correo Electrónico
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              placeholder="nombre@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-all outline-none placeholder:text-white/20 focus:border-[#0175D9] focus:ring-1 focus:ring-[#0175D9]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-xs font-bold tracking-widest text-[#94A3B8] uppercase"
            >
              Contraseña
            </label>
            <a
              href="#"
              className="text-xs text-[#0175D9] transition-colors hover:text-blue-400"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <div className="relative">
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-all outline-none placeholder:text-white/20 focus:border-[#0175D9] focus:ring-1 focus:ring-[#0175D9]"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-xl bg-[#0175D9] text-base font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-600 active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Entrando...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Entrar
              <ArrowRight className="h-5 w-5" />
            </span>
          )}
        </Button>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#02011A] px-2 text-[#94A3B8]">
              O continuar con
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border-white/10 bg-white/5 text-base font-medium text-white transition-all hover:bg-white/10"
        >
          Iniciar sesión con Google
        </Button>
      </form>
    </GlassCard>
  )
}

export default Page
