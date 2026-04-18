"use client"
import { Star } from "lucide-react"
import { motion } from "motion/react"

const testimonials = [
  {
    name: "Andrea Martínez",
    role: "Diseñadora UX, 24 años",
    content:
      "Acabo de egresar y jamás me enseñaron sobre deducciones. VanTax me ayudó a recuperar $12,500 en mi primera declaración.",
    rating: 5,
  },
  {
    name: "Diego Hernández",
    role: "Freelance",
    content:
      "Antes me daba pánico calcular impuestos. Ahora VanTax lo hace automáticamente y me avisa de cada cambio.",
    rating: 5,
  },
  {
    name: "Sofía Ramírez",
    role: "Ingeniera, 27 años",
    content:
      "La IA de VanTax escanea mis facturas y me dice exactamente qué puedo recuperar. ¡Súper fácil!",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <div className="flex min-h-screen items-center px-4 py-16 sm:px-6 md:py-24">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Recuperando su dinero
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#94A3B8] sm:text-lg md:text-xl">
            Personas como tú que descubrieron miles de pesos olvidados en
            deducciones con nuestra plataforma inteligente.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-3xl border border-[#0175D9]/20 bg-[#002761]/30 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-[#0175D9]/50 hover:bg-[#002761]/40 md:p-8"
            >
              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-5 flex gap-1 md:mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-[#0175D9] text-[#0175D9] md:h-5 md:w-5"
                    />
                  ))}
                </div>
                <p className="mb-8 text-base leading-relaxed text-white italic md:text-lg">
                  {testimonial.content}
                </p>
                <div className="mt-auto flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0175D9] font-bold text-white shadow-inner">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-base font-bold text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-[#94A3B8]">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
