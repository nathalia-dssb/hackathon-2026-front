"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4 py-8" style={{
      background: 'linear-gradient(135deg, #7C90DB 0%, #F2FAFF 25%, #0175D9 50%, #002761 100%)'
    }}>
      <div className="flex items-center justify-center gap-0 shrink-0">
        <Link href="/">
        <Image src="/Imagenes/Group.png" alt="Group" width={40} height={40} className="h-8 w-auto" />
        <div className="relative">
          <Image src="/Imagenes/VANTAX.png" alt="VANTAX" width={150} height={40} className="h-8 w-auto" />
          <div className="absolute -right-10 top-1/2 transform -translate-y-1/2" style={{
            animation: 'float 3s ease-in-out infinite'
          }}>
            <Image src="/Imagenes/MX.png" alt="MX" width={24} height={24} className="h-5 w-auto" />
          
          </div>
        </div>
        </Link>
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
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      const response = await fetch('/backend-api/users/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const result = await response.json();

      if (response.status === 201 || response.status === 200) {
        
        // GUARDAMOS EL ID EN LOCALSTORAGE
        if (result.data && result.data.id) {
          localStorage.setItem("userId", result.data.id);
          localStorage.setItem("userEmail", result.data.email);
        }

        router.push("/main/chat"); 
      } else {
        alert(result.message || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error en el túnel de login:", error);
      alert("Error de comunicación con el túnel local");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm bg-white/20 backdrop-blur-md border border-white/30 px-4">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <label htmlFor="email" className="text-xs font-medium leading-none text-white">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="x@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="flex h-12 w-full rounded-none border border-white/30 bg-transparent px-4 py-3 text-base text-white placeholder:text-white/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="password" className="text-xs font-medium leading-none text-white">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder="*****"
                value={formData.password}
                onChange={handleChange}
                required
                className="flex h-12 w-full rounded-none border border-white/30 bg-transparent px-4 py-3 text-base text-white placeholder:text-white/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
              />
              <a href="#" className="ml-auto inline-block text-xs text-white/80 underline-offset-4 hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 bg-blue-600 text-base text-white hover:bg-blue-700 shadow-lg mt-2"
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-3 pb-6">
        <Button variant="outline" className="w-full h-12 text-base bg-white/10 border-white/30 text-white hover:bg-white/20">
          Entrar con Google
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Page;