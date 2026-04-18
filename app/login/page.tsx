import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4 py-8" style={{
      background: 'linear-gradient(135deg, #7C90DB 0%, #F2FAFF 25%, #0175D9 50%, #002761 100%)'
    }}>
      {/* Logo */}
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
  return (
    
    <Card className="w-full max-w-sm bg-white/20 backdrop-blur-md border border-white/30 px-4">
      <CardContent className="pt-6">
        <form>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <label htmlFor="email" className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="x@ejemplo.com"
                required
                className="flex h-12 w-full rounded-none border border-input bg-transparent px-4 py-3 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <label htmlFor="password" className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Contraseña
                </label>
              </div>
              <input
                id="password"
                type="password"
                placeholder="*****"
                required
                className="flex h-12 w-full rounded-none border border-input bg-transparent px-4 py-3 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              <a href="#" className="ml-auto inline-block text-xs underline-offset-4 hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </a>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-3 pb-6">
        <Button type="submit" className="w-full h-12 bg-blue-500 text-base text-white hover:bg-blue-600">
          Entrar
        </Button>
        <Button variant="outline" className="w-full h-12 text-base">
          Entrar con Google
        </Button>
      </CardFooter>
    </Card>
  )
}


export default Page
