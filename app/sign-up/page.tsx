"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TAX_REGIME_OPTIONS } from "@/interfaces/Profile.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight } from 'lucide-react';



export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const [personal, setPersonal] = useState({
    firstName: "", lastName: "", birthDate: "", email: "", password: "", confirmPassword: ""
  });

  const [tax, setTax] = useState({
    taxRegime: "",
    averageSalary: 0,
    maxSalary: 0 
  });

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (personal.password !== personal.confirmPassword) return alert("Contraseñas no coinciden");

    setLoading(true);
    try {
      const res = await fetch('/backend-api/users/signup', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: personal.firstName,
          last_name: personal.lastName,
          birth_date: personal.birthDate,
          email: personal.email,
          password: personal.password,
        }),
      });

      const result = await res.json();
      if (res.status === 201 && result.data?.id) {
        setUserId(result.data.id);
        setStep(2);
      } else {
        alert(result.message || "Error al registrar");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    setLoading(true);
    try {
      const res = await fetch(`/backend-api/users/${userId}/tax-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          regimen_fiscal: tax.taxRegime,
          current_salary: Number(tax.averageSalary),
          max_income_allowed: Number(tax.maxSalary)
        }),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        alert("Error al guardar perfil fiscal");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4 py-8" style={{
      background: 'linear-gradient(315deg, #002761 0%, #0175D9 35%, #7C90DB 65%, #F2FAFF 100%)'
    }}>
      
      {/* Header */}
      <div className="flex items-center justify-center gap-0 mb-4">
        <Image src="/Imagenes/Group.png" alt="Logo" width={40} height={40} />
        <div className="relative">
          <Image src="/Imagenes/VANTAX.png" alt="Vantax" width={150} height={40} />
          <div className="absolute -right-10 top-1/2 -translate-y-1/2 animate-bounce">
            <Image src="/Imagenes/MX.png" alt="MX" width={24} height={24} />
          </div>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/20 text-white/40'}`}>1</div>
        <div className={`h-1 w-12 transition-all duration-500 ${step >= 2 ? 'bg-blue-600' : 'bg-white/20'}`} />
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/20 text-white/40'}`}>2</div>
      </div>

      <Card className="w-full max-w-sm bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
        <CardContent className="pt-8 px-6">
          
          {step === 1 ? (
            <form onSubmit={handleStep1Submit} className="space-y-3">
              <h3 className="text-white text-center font-bold mb-4">Crear Cuenta</h3>
              <input required placeholder="Nombre(s)" className="vantax-input" onChange={(e) => setPersonal({...personal, firstName: e.target.value})} />
              <input required placeholder="Apellidos" className="vantax-input" onChange={(e) => setPersonal({...personal, lastName: e.target.value})} />
              <input type="date" required className="vantax-input" onChange={(e) => setPersonal({...personal, birthDate: e.target.value})} />
              <input type="email" required placeholder="Correo" className="vantax-input" onChange={(e) => setPersonal({...personal, email: e.target.value})} />
              <input type="password" required placeholder="Contraseña" className="vantax-input" onChange={(e) => setPersonal({...personal, password: e.target.value})} />
              <input type="password" required placeholder="Confirmar" className="vantax-input" onChange={(e) => setPersonal({...personal, confirmPassword: e.target.value})} />
              <Button type="submit" disabled={loading} className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg mt-4 shadow-lg active:scale-[0.98] transition-all">
                {loading ? "Registrando..." : "Continuar"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleStep2Submit} className="space-y-6">
              <h3 className="text-white text-center font-bold">Perfil Fiscal</h3>
              
              {/* 2. Selector de Régimen con estilo GlassCard */}
              <div className="space-y-2">
                <div className="h-20 flex items-center border border-white/10 bg-white/5 rounded-[2.5rem] overflow-hidden p-0">
                  <Select onValueChange={(v) => setTax({...tax, taxRegime: v})}>
                    <SelectTrigger className="w-full h-full border-none bg-transparent px-12 focus:ring-0 text-left">
                      <div className="flex flex-col items-start gap-1">
                        <span className="text-xs text-white/60 font-bold uppercase tracking-tighter">Regimen</span>
                        <div className="text-white text-sm font-medium">
                          <SelectValue placeholder="Selecciona" />
                        </div>
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-[#0A0A1F] border-white/10 text-white">
                      {TAX_REGIME_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <SalaryInputComponent 
                label="Salario medio" 
                value={tax.averageSalary} 
                description="Salario que recibes promedio al mes"
                onChange={(val: number) => setTax({...tax, averageSalary: val})}
              />

              <SalaryInputComponent 
                label="Salario Max" 
                value={tax.maxSalary} 
                description="Salario máximo que puedes llegar a percibir"
                onChange={(val: number) => setTax({...tax, maxSalary: val})}
              />

              <Button type="submit" disabled={loading} className="w-full h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl shadow-lg active:scale-[0.98] transition-all">
                {loading ? "Guardando..." : "Finalizar Registro"}
              </Button>
            </form>
          )}

        </CardContent>
      </Card>

      <style jsx>{`
        .vantax-input {
          width: 100%; height: 3.5rem; background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 0.75rem;
          padding: 0 1rem; color: white; outline: none; transition: border 0.2s;
        }
        .vantax-input:focus { border-color: #3b82f6; }
      `}</style>
    </div>
  );
}

function SalaryInputComponent({ label, value, description, onChange }: { label: string, value: number, description: string, onChange: (val: number) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="space-y-2">
      <div 
        onClick={() => inputRef.current?.focus()}
        className="h-20 flex items-center border border-white/10 bg-white/5 rounded-[2.5rem] cursor-text group"
      >
        <div className="w-full h-full px-12 flex justify-between items-center text-left">
          <div className="flex flex-col items-start gap-1">
            <span className="text-xs text-white/60 font-bold uppercase tracking-tighter">{label}</span>
            <div className="flex items-center gap-1">
              <span className="text-white font-medium text-sm">$</span>
              <input 
                ref={inputRef} type="number"
                value={value === 0 ? '' : value}
                onChange={(e) => onChange(e.target.value === '' ? 0 : Number(e.target.value))}
                placeholder="0"
                className="bg-transparent border-none outline-none text-white text-sm w-full font-medium placeholder:text-white/20"
              />
            </div>
          </div>
          <ChevronRight className="h-6 w-6 text-white/30 group-hover:text-white transition-colors" />
        </div>
      </div>
      <p className="text-[10px] text-white/40 ml-10 italic">{description}</p>
    </div>
  );
}