"use client"; // Necesario para usar hooks como useState y useRouter

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Para la redirección
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const API_URL = process.env.NEXT_PUBLIC_BACKAPI;

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4 py-8 overflow-y-auto" style={{
      background: 'linear-gradient(315deg, #002761 0%, #0175D9 35%, #7C90DB 65%, #F2FAFF 100%)'
    }}>
      <div className="flex items-center justify-center gap-0 shrink-0 relative">
        <Image src="/Imagenes/Group.png" alt="Group" width={40} height={40} className="h-8 w-auto" />
        <div className="relative">
          <Image src="/Imagenes/VANTAX.png" alt="VANTAX" width={150} height={40} className="h-8 w-auto" />
          <div className="absolute -right-10 top-1/2 transform -translate-y-1/2" style={{
            animation: 'float 3s ease-in-out infinite'
          }}>
            <Image src="/Imagenes/MX.png" alt="MX" width={24} height={24} className="h-5 w-auto" />
          </div>
        </div>
      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(-2px); }
          50% { transform: translateY(2px); }
        }
      `}</style>
      <CardDemo />
    </div>
  )
}

export function CardDemo() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/backend-api/users/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: formData.firstName,
        last_name: formData.lastName,
        birth_date: formData.birthDate,
        email: formData.email,
        password: formData.password,
      }),
    });

      const result = await response.json();

      if (response.status === 201) {
        console.log("Registro completo");
        router.push("/login"); 
      } else {
        alert(result.message || "Error en el registro");
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
      alert("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm bg-white/20 backdrop-blur-md border border-white/30 px-4">
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-3">
            {/* Nombre */}
            <div className="grid gap-2">
              <label htmlFor="firstName" className="text-xs font-medium leading-none">Nombre(s)</label>
              <input
                id="firstName"
                type="text"
                placeholder="Nombre(s)"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="flex h-12 w-full rounded-none border border-input bg-transparent px-4 py-3 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-white placeholder:text-white/60"
              />
            </div>
            
            {/* Apellido */}
            <div className="grid gap-2">
              <label htmlFor="lastName" className="text-xs font-medium leading-none">Apellido(s)</label>
              <input
                id="lastName"
                type="text"
                placeholder="Apellido(s)"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="flex h-12 w-full rounded-none border border-input bg-transparent px-4 py-3 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-white placeholder:text-white/60"
              />
            </div>

            {/* Fecha Nacimiento */}
            <div className="grid gap-2">
              <label htmlFor="birthDate" className="text-xs font-medium leading-none">Fecha de nacimiento</label>
              <input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
                required
                className="flex h-12 w-full rounded-none border border-input bg-transparent px-4 py-3 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-white"
              />
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <label htmlFor="email" className="text-xs font-medium leading-none">Correo electrónico</label>
              <input
                id="email"
                type="email"
                placeholder="x@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="flex h-12 w-full rounded-none border border-input bg-transparent px-4 py-3 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-white placeholder:text-white/60"
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <label htmlFor="password" className="text-xs font-medium leading-none">Contraseña</label>
              <input
                id="password"
                type="password"
                placeholder="*****"
                value={formData.password}
                onChange={handleChange}
                required
                className="flex h-12 w-full rounded-none border border-input bg-transparent px-4 py-3 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-white placeholder:text-white/60"
              />
            </div>

            {/* Confirm Password */}
            <div className="grid gap-2">
              <label htmlFor="confirmPassword" className="text-xs font-medium leading-none">Confirmar contraseña</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="*****"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="flex h-12 w-full rounded-none border border-input bg-transparent px-4 py-3 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-white placeholder:text-white/60"
              />
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex-col gap-3 pb-6">
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 bg-blue-500 text-base text-white hover:bg-blue-600"
          >
            {loading ? "Registrando..." : "Registrarse"}
          </Button>
          <Button variant="outline" className="w-full h-12 text-base bg-white/10 hover:bg-white/20 border-white/30 text-white">
            Entrar con Google
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default Page;