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
import { ChevronRight } from 'lucide-react';
import { TAX_REGIME_OPTIONS, UserProfileData } from './../../interfaces/Profile.types';

export default function ProfilePage() {
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

  return (
    <div className="min-h-screen w-full max-w-md mx-auto p-6 flex flex-col gap-8 bg-white relative">
      <div className="flex flex-col items-center gap-4 mt-8">
        <Avatar className="h-32 w-32 border-2 border-slate-200">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>AO</AvatarFallback>
        </Avatar>
      </div>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-slate-900 ml-1">Información Personal</h2>
        <div className="space-y-3">
          <Input 
            value={profile.firstName} 
            readOnly
            className="h-12 rounded-xl border-slate-200 bg-slate-50 text-slate-500 cursor-default"
          />
          <Input 
            value={profile.email} 
            readOnly 
            className="h-12 rounded-xl border-slate-200 bg-slate-50 text-slate-500 cursor-default"
          />
        </div>
      </section>

      <Separator className="bg-slate-200" />

      <section className="space-y-6">
        <h2 className="text-sm font-semibold text-slate-900 ml-1">Información Fiscal</h2>
        
        <div className="space-y-2">
          {/* Contenedor que abraza al Select */}
          <div className="relative border border-slate-200 rounded-[2.5rem] h-24 flex items-center hover:border-slate-300 transition-all shadow-sm bg-white overflow-hidden">
            <Select 
              value={profile.taxRegime} 
              onValueChange={(val) => handleFieldChange('taxRegime', val)}
            >
              {/* Quitamos el icono manual para dejar solo el de Shadcn o viceversa */}
              <SelectTrigger className="w-full h-full border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 px-8 flex justify-between items-center [&>svg]:h-6 [&>svg]:w-6 [&>svg]:text-slate-300">
                <div className="flex flex-col items-start text-left gap-1">
                  <span className="text-base text-slate-400 font-normal">Regimen</span>
                  <div className="text-slate-900 font-medium text-xl">
                    <SelectValue placeholder="Selecciona tu régimen" />
                  </div>
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {TAX_REGIME_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-xs text-slate-400 ml-8 italic">
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
          style={{ backgroundColor: '#02011A' }}
          className="w-full h-16 rounded-2xl text-white text-xl font-medium shadow-md active:scale-[0.98] transition-all hover:opacity-90"
          onClick={() => console.log("Cerrando sesión para:", profile.email)}
        >
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
}

function SalaryInput({ label, value, description, onChange }: SalaryInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-2">
      <div 
        onClick={() => inputRef.current?.focus()}
        className="relative group cursor-text border border-slate-200 rounded-[2.5rem] h-24 px-8 flex items-center justify-between hover:border-slate-300 focus-within:ring-1 focus-within:ring-slate-200 transition-all shadow-sm bg-white"
      >
        <div className="flex flex-col w-full gap-1">
          <span className="text-base text-slate-400 font-normal">{label}</span>
          <div className="flex items-center gap-1">
            <span className="text-slate-900 font-medium text-xl">$</span>
            <input 
              ref={inputRef}
              type="number"
              value={value}
              onChange={(e) => onChange(Number(e.target.value))}
              className="bg-transparent border-none outline-none text-slate-900 font-medium text-xl w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>
        <ChevronRight className="h-6 w-6 text-slate-300 group-hover:text-slate-400 transition-colors" />
      </div>
      <p className="text-xs text-slate-400 ml-8 italic">
        {description}
      </p>
    </div>
  );
}

interface SalaryInputProps {
  label: string;
  value: number;
  description: string;
  onChange: (val: number) => void;
}