"use client"

import React, { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronRight, User, ShieldCheck } from "lucide-react"

import { GlassCard } from "../../../components/dashboard/glass-card"
import { LogoutModal } from "../../../components/modals/logout-modal"

import {
  TAX_REGIME_OPTIONS,
  UserProfileData,
} from "../../../interfaces/Profile.types"

export default function Page() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const [profile, setProfile] = useState<UserProfileData>({
    firstName: "",
    email: "",
    taxRegime: "",
    averageSalary: 0,
    maxSalary: 0,
  })

  useEffect(() => {
    const loadProfileData = async () => {
      const userId = localStorage.getItem("userId")
      if (!userId) return

      try {
        const [userRes, taxRes] = await Promise.all([
          fetch(`/backend-api/users/${userId}`),
          fetch(`/backend-api/users/${userId}/tax-profile`),
        ])

        const userJson = await userRes.json()
        const taxJson = await taxRes.json()

        if (userRes.ok) {
          const u = userJson.data
          const t = taxRes.ok ? taxJson.data : null

          setProfile({
            firstName: `${u.first_name} ${u.last_name}`,
            email: u.email,
            taxRegime: t?.regimen_fiscal || "",
            averageSalary: t?.current_salary || 0,
            maxSalary: t?.max_income_allowed || 0,
          })
        }
      } catch (error) {
        console.error("Fallo en la carga de perfil:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProfileData()
  }, [])

  const syncTaxProfile = async (updatedFields: Partial<UserProfileData>) => {
    const userId = localStorage.getItem("userId")
    if (!userId) return

    const payload = {
      regimen_fiscal: updatedFields.taxRegime || profile.taxRegime,
      current_salary:
        updatedFields.averageSalary !== undefined
          ? updatedFields.averageSalary
          : profile.averageSalary,
      max_income_allowed:
        updatedFields.maxSalary !== undefined
          ? updatedFields.maxSalary
          : profile.maxSalary,
    }

    try {
      const res = await fetch(`/backend-api/users/${userId}/tax-profile`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        console.log("Sincronización exitosa:", payload)
      } else {
        const errData = await res.json()
        console.error("Error de validación:", errData)
      }
    } catch (err) {
      console.error("Error de red al sincronizar:", err)
    }
  }

  const handleRegimeChange = (value: string) => {
    setProfile((prev) => ({ ...prev, taxRegime: value }))
    syncTaxProfile({ taxRegime: value })
  }

  const handleLocalSalaryChange = (
    field: "averageSalary" | "maxSalary",
    value: number
  ) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleConfirmLogout = () => {
    localStorage.clear()
    window.location.href = "/login"
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#02011A]">
        <div className="animate-pulse font-mono text-xs text-blue-400">
          ESTABLECIENDO CONEXIÓN SEGURA...
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-8 overflow-y-auto p-6 pb-20 text-white">
      {/* Avatar */}
      <div className="mt-8 flex flex-col items-center gap-4">
        <Avatar className="h-32 w-32 border-2 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
          <AvatarImage
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile.firstName}`}
          />
          <AvatarFallback>AO</AvatarFallback>
        </Avatar>
      </div>

      {/* Info Personal */}
      <section className="space-y-4">
        <h2 className="ml-1 flex items-center gap-2 text-sm font-semibold tracking-wider text-blue-200/60 uppercase">
          <User size={16} /> Información Personal
        </h2>
        <GlassCard className="space-y-3 border-white/5 p-4">
          <Input
            value={profile.firstName}
            readOnly
            className="h-12 border-white/10 bg-white/5 px-6 text-blue-200/80"
          />
          <Input
            value={profile.email}
            readOnly
            className="h-12 border-white/10 bg-white/5 px-6 text-blue-200/80"
          />
        </GlassCard>
      </section>

      <Separator className="bg-white/5" />

      {/* Info Fiscal */}
      <section className="space-y-6">
        <h2 className="ml-1 flex items-center gap-2 text-sm font-semibold tracking-wider text-blue-200/60 uppercase">
          <ShieldCheck size={16} /> Información Fiscal
        </h2>

        {/* Selector de Régimen */}
        <div className="space-y-2">
          <GlassCard className="flex h-20 items-center overflow-hidden rounded-[2.5rem] border-white/10 bg-white/5 p-0">
            <Select
              value={profile.taxRegime}
              onValueChange={handleRegimeChange}
            >
              <SelectTrigger className="h-full w-full border-none bg-transparent px-12 focus:ring-0">
                <div className="flex flex-col items-start gap-1">
                  <span className="text-xs font-medium text-blue-400/60">
                    Regimen
                  </span>
                  <SelectValue placeholder="Selecciona" />
                </div>
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-[#0A0A1F] text-white">
                {TAX_REGIME_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </GlassCard>
        </div>

        {/* Salario Medio */}
        <SalaryInputComponent
          label="Salario medio"
          value={profile.averageSalary}
          description="Salario que recibes promedio al mes"
          onChange={(val: number) =>
            handleLocalSalaryChange("averageSalary", val)
          }
          onSync={() =>
            syncTaxProfile({ averageSalary: profile.averageSalary })
          }
        />

        {/* Salario Máximo */}
        <SalaryInputComponent
          label="Salario Max"
          value={profile.maxSalary}
          description="Salario máximo que puedes llegar a percibir"
          onChange={(val: number) => handleLocalSalaryChange("maxSalary", val)}
          onSync={() => syncTaxProfile({ maxSalary: profile.maxSalary })}
        />
      </section>

      <Button
        onClick={() => setIsLogoutModalOpen(true)}
        className="mt-auto h-16 rounded-2xl border border-white/10 bg-[#002761] transition-all hover:bg-[#050525]"
      >
        Cerrar Sesión
      </Button>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </div>
  )
}

function SalaryInputComponent({
  label,
  value,
  description,
  onChange,
  onSync,
}: {
  label: string
  value: number
  description: string
  onChange: (val: number) => void
  onSync: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") inputRef.current?.blur()
  }

  return (
    <div className="space-y-2">
      <GlassCard
        onClick={() => inputRef.current?.focus()}
        className="group flex h-20 cursor-text items-center rounded-[2.5rem] border-white/10 bg-white/5 p-0"
      >
        <div className="flex h-full w-full items-center justify-between px-12">
          <div className="flex w-full flex-col items-start gap-1 text-left">
            <span className="text-xs font-medium text-blue-400/60">
              {label}
            </span>
            <div className="flex w-full items-center gap-1">
              <span className="text-sm font-medium text-blue-100">$</span>
              <input
                ref={inputRef}
                type="number"
                value={value === 0 ? "" : value}
                onChange={(e) => {
                  const val = e.target.value
                  onChange(val === "" ? 0 : Number(val))
                }}
                onBlur={onSync}
                onKeyDown={handleKeyDown}
                placeholder="0"
                className="w-full border-none bg-transparent text-sm font-medium text-white outline-none placeholder:text-blue-200/20"
              />
            </div>
          </div>
          <ChevronRight className="h-6 w-6 shrink-0 text-blue-400/40 transition-colors group-hover:text-blue-400" />
        </div>
      </GlassCard>
      <p className="ml-10 text-[10px] text-blue-200/40 italic">{description}</p>
    </div>
  )
}
