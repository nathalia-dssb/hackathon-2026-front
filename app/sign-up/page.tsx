"use client"

import React, { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/dashboard/glass-card"
import { TAX_REGIME_OPTIONS } from "@/interfaces/Profile.types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronRight, ArrowRight, UserPlus, FileText } from "lucide-react"
import { AnimatedBackground } from "@/components/landing/AnimatedBackground"
import { FloatingElements } from "@/components/landing/FloatingElements"

const logo = "/Imagenes/vantax_logo.svg"

export default function SignUpPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  const [personal, setPersonal] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [tax, setTax] = useState({
    taxRegime: "",
    averageSalary: 0,
    maxSalary: 0,
  })

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (personal.password !== personal.confirmPassword)
      return alert("Contraseñas no coinciden")

    setLoading(true)
    try {
      const res = await fetch("/backend-api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: personal.firstName,
          last_name: personal.lastName,
          birth_date: personal.birthDate,
          email: personal.email,
          password: personal.password,
        }),
      })

      const result = await res.json()
      if (res.status === 201 && result.data?.id) {
        setUserId(result.data.id)
        setStep(2)
      } else {
        alert(result.message || "Error al registrar")
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId) return

    setLoading(true)
    try {
      const res = await fetch(`/backend-api/users/${userId}/tax-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          regimen_fiscal: tax.taxRegime,
          current_salary: Number(tax.averageSalary),
          max_income_allowed: Number(tax.maxSalary),
        }),
      })

      if (res.ok) {
        router.push("/login")
      } else {
        alert("Error al guardar perfil fiscal")
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

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
        {/* Header */}
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
            Comienza tu camino
          </h1>
          <p className="mt-2 text-sm text-[#94A3B8]">
            {step === 1
              ? "Crea tu cuenta personal"
              : "Configura tu perfil fiscal"}
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                step >= 1
                  ? "bg-[#0175D9] text-white shadow-lg shadow-blue-500/20"
                  : "bg-white/10 text-white/40"
              }`}
            >
              <UserPlus size={18} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
              Personal
            </span>
          </div>
          <div
            className={`h-0.5 w-16 transition-all duration-500 ${
              step >= 2 ? "bg-[#0175D9]" : "bg-white/10"
            }`}
          />
          <div className="flex flex-col items-center gap-2">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                step === 2
                  ? "bg-[#0175D9] text-white shadow-lg shadow-blue-500/20"
                  : "bg-white/10 text-white/40"
              }`}
            >
              <FileText size={18} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
              Fiscal
            </span>
          </div>
        </div>

        <GlassCard className="border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.form
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleStep1Submit}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
                      Nombre
                    </label>
                    <input
                      required
                      placeholder="Juan"
                      className="vantax-input"
                      value={personal.firstName}
                      onChange={(e) =>
                        setPersonal({ ...personal, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
                      Apellidos
                    </label>
                    <input
                      required
                      placeholder="Pérez"
                      className="vantax-input"
                      value={personal.lastName}
                      onChange={(e) =>
                        setPersonal({ ...personal, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    required
                    className="vantax-input"
                    value={personal.birthDate}
                    onChange={(e) =>
                      setPersonal({ ...personal, birthDate: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="juan@ejemplo.com"
                    className="vantax-input"
                    value={personal.email}
                    onChange={(e) =>
                      setPersonal({ ...personal, email: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      className="vantax-input"
                      value={personal.password}
                      onChange={(e) =>
                        setPersonal({ ...personal, password: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
                      Confirmar
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      className="vantax-input"
                      value={personal.confirmPassword}
                      onChange={(e) =>
                        setPersonal({
                          ...personal,
                          confirmPassword: e.target.value,
                        })
                      }
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
                      Registrando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Continuar
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  )}
                </Button>
              </motion.form>
            ) : (
              <motion.form
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleStep2Submit}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
                    Régimen Fiscal
                  </label>
                  <Select onValueChange={(v) => setTax({ ...tax, taxRegime: v })}>
                    <SelectTrigger className="vantax-input flex w-full items-center justify-between border-white/10 bg-white/5 px-4 outline-none">
                      <SelectValue placeholder="Selecciona tu régimen" />
                    </SelectTrigger>
                    <SelectContent className="border-white/10 bg-[#0A0A1F] text-white">
                      {TAX_REGIME_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <SalaryInputComponent
                  label="Salario promedio"
                  value={tax.averageSalary}
                  description="Tu ingreso mensual estimado"
                  onChange={(val: number) =>
                    setTax({ ...tax, averageSalary: val })
                  }
                />

                <SalaryInputComponent
                  label="Salario Máximo"
                  value={tax.maxSalary}
                  description="Máximo ingreso anual permitido"
                  onChange={(val: number) => setTax({ ...tax, maxSalary: val })}
                />

                <Button
                  type="submit"
                  disabled={loading}
                  className="h-14 w-full rounded-xl bg-[#0175D9] text-lg font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-600 active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Guardando...
                    </span>
                  ) : (
                    "Finalizar Registro"
                  )}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </GlassCard>

        <p className="mt-8 text-center text-sm text-[#94A3B8]">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/login"
            className="font-medium text-[#0175D9] transition-colors hover:text-blue-400"
          >
            Inicia sesión
          </Link>
        </p>
      </motion.div>

      <style jsx>{`
        .vantax-input {
          width: 100%;
          height: 3rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
          padding: 0 1rem;
          color: white;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.2s;
        }
        .vantax-input:focus {
          border-color: #0175D9;
          box-shadow: 0 0 0 1px #0175D9;
        }
        .vantax-input::placeholder {
          color: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  )
}

function SalaryInputComponent({
  label,
  value,
  description,
  onChange,
}: {
  label: string
  value: number
  description: string
  onChange: (val: number) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div className="space-y-2">
      <div
        onClick={() => inputRef.current?.focus()}
        className="group flex h-20 items-center rounded-2xl border border-white/10 bg-white/5 transition-all hover:border-white/20"
      >
        <div className="flex w-full items-center justify-between px-6 text-left">
          <div className="flex flex-col items-start gap-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
              {label}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-white">$</span>
              <input
                ref={inputRef}
                type="number"
                value={value === 0 ? "" : value}
                onChange={(e) =>
                  onChange(e.target.value === "" ? 0 : Number(e.target.value))
                }
                placeholder="0"
                className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/20"
              />
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-white/20 transition-colors group-hover:text-white" />
        </div>
      </div>
      <p className="ml-4 text-[10px] italic text-[#94A3B8]/60">{description}</p>
    </div>
  )
}