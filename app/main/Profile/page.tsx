"use client";

import React, { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, User, ShieldCheck, ChevronDown } from 'lucide-react';
import { GlassCard } from "../../../components/dashboard/glass-card";
import { LogoutModal } from "../../../components/modals/logout-modal"; 
import { 
  TAX_REGIME_OPTIONS, 
  UserProfileData, 
  SalaryInputProps 
} from '../../../interfaces/Profile.types';

export default function ProfilePage() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
  const [profile, setProfile] = useState<UserProfileData>({
    firstName: 'Alan Orlando',
    email: 'Alan78707@gmail.com',
    taxRegime: 'PLATAFORMAS_TECNOLOGICAS',
    averageSalary: 30000,
    maxSalary: 40000,
  });

  const handleUpdateProfile = (updatedData: UserProfileData) => {
    console.log("Peticion", updatedData);
  };

  const handleFieldChange = (field: keyof UserProfileData, value: string | number) => {
    const newProfile = { ...profile, [field]: value };
    setProfile(newProfile);
    handleUpdateProfile(newProfile);
  };

  const handleConfirmLogout = () => {
    console.log("Cerrando sesión para", profile.email);
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="min-h-screen w-full max-w-md mx-auto p-6 flex flex-col gap-8 text-white overflow-y-auto pb-20 ">
      
      <div className="flex flex-col items-center gap-4 mt-8">
        {/** 
        <div className="relative">
          <Avatar className="h-32 w-32 border-2 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-blue-500/20 text-blue-400">AO</AvatarFallback>
          </Avatar>
        </div>
        */}
      </div>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-blue-200/60 ml-1 uppercase tracking-wider">
          <User size={16} /> Información Personal
        </h2>
        <GlassCard className="space-y-3 p-4 border-white/5">
          <Input 
            value={profile.firstName} 
            readOnly
            className="h-12 rounded-xl border-white/10 bg-white/5 text-blue-200/80 cursor-default focus:ring-0 px-6"
          />
          <Input 
            value={profile.email} 
            readOnly 
            className="h-12 rounded-xl border-white/10 bg-white/5 text-blue-200/80 cursor-default focus:ring-0 px-6"
          />
        </GlassCard>
      </section>

      <Separator className="bg-white/5" />

      {/* Sección Información Fiscal */}
      <section className="space-y-6">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-blue-200/60 ml-1 uppercase tracking-wider">
          <ShieldCheck size={16} /> Información Fiscal
        </h2>
        
        <div className="space-y-2">
          <GlassCard className="relative h-20 flex items-center border-white/10 bg-white/5 hover:border-blue-500/30 transition-all overflow-hidden p-0 rounded-[2.5rem]">
            <Select 
              value={profile.taxRegime} 
              onValueChange={(val) => handleFieldChange('taxRegime', val)}
            >
              <SelectTrigger className="w-full h-full border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 px-12 flex justify-between items-center group [&>svg]:h-6 [&>svg]:w-6 [&>svg]:text-slate-300">
                <div className="flex flex-col items-start text-left gap-1">
                  <span className="text-xs text-blue-400/60 font-medium">Regimen</span>
                  <div className="text-blue-100 font-medium text-sm leading-tight max-w-[180px]">
                    <SelectValue placeholder="Selecciona tu régimen" />
                  </div>
                </div>
              </SelectTrigger>
              <SelectContent className="bg-[#0A0A1F] border-white/10 text-blue-100 rounded-xl">
                {TAX_REGIME_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value} className="focus:bg-blue-500/20 focus:text-white">
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </GlassCard>
          <p className="text-[10px] text-blue-200/40 ml-10 italic">
            El regimen marca a donde perteneces para el cálculo de impuestos
          </p>
        </div>

        <SalaryInput 
          label="Salario medio" 
          value={profile.averageSalary} 
          description="Salario que recibes promedio al mes"
          onChange={(val) => handleFieldChange('averageSalary', val)}
        />

        <SalaryInput 
          label="Salario Max" 
          value={profile.maxSalary} 
          description="Salario máximo que puedes llegar a percibir"
          onChange={(val) => handleFieldChange('maxSalary', val)}
        />
      </section>

      <div className="mt-auto pb-8">
        <Button 
          style={{ backgroundColor: '#002761' }}
          className="w-full h-16 rounded-2xl text-white border border-white/10 text-xl font-medium shadow-[0_4px_20px_rgba(0,0,0,0.4)] active:scale-[0.98] transition-all hover:bg-[#050525]"
          onClick={() => setIsLogoutModalOpen(true)}
        >
          Cerrar Sesión
        </Button>
      </div>

      <LogoutModal 
        isOpen={isLogoutModalOpen} 
        onClose={() => setIsLogoutModalOpen(false)} 
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
}

function SalaryInput({ label, value, description, onChange }: SalaryInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-2">
      <GlassCard 
        onClick={() => inputRef.current?.focus()}
        className="relative h-20 flex items-center border-white/10 bg-white/5 hover:border-blue-500/30 transition-all overflow-hidden p-0 rounded-[2.5rem] cursor-text group"
      >
        <div className="w-full h-full px-12 flex justify-between items-center">
          <div className="flex flex-col items-start text-left gap-1">
            <span className="text-xs text-blue-400/60 font-medium">{label}</span>
            <div className="flex items-center gap-1">
              <span className="text-blue-100 font-medium text-sm">$</span>
              <input 
                ref={inputRef}
                type="number"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="bg-transparent border-none outline-none text-blue-100 font-medium text-sm w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:text-blue-200/20 leading-tight"
              />
            </div>
          </div>
          <ChevronRight className="h-6 w-6 text-blue-400/40 group-hover:text-blue-400 transition-colors shrink-0" />
        </div>
      </GlassCard>
      <p className="text-[10px] text-blue-200/40 ml-10 italic">
        {description}
      </p>
    </div>
  );
}