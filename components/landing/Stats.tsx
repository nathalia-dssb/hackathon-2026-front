"use client"
import { DollarSign, Receipt, Users, Zap } from "lucide-react"
import { motion } from "motion/react"

const stats = [
  {
    icon: DollarSign,
    value: "$15,847",
    label: "Promedio recuperado",
    growth: "Anual 2025",
  },
  {
    icon: Receipt,
    value: "1.2M+",
    label: "Facturas con IA",
    growth: "Creciendo cada día",
  },
  {
    icon: Users,
    value: "18-35",
    label: "Edad promedio",
    growth: "Jóvenes profesionales",
  },
  {
    icon: Zap,
    value: "2 min",
    label: "Por factura",
    growth: "vs 15 min manual",
  },
]

export function Stats() {
  return (
    <div className="flex min-h-screen items-center px-4 py-12 sm:px-6 md:py-24">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-[#0175D9]/30 bg-[#002761]/40 p-8 backdrop-blur-xl sm:p-12 md:p-16"
        >
          <div className="relative z-10">
            <div className="mb-12 text-center md:mb-20">
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                El poder de la automatización
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#94A3B8] sm:text-lg md:text-xl">
                Datos reales de jóvenes profesionales que ya están recuperando
                su dinero con VanTax MX.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4 lg:gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0175D9]/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#0175D9]/20 md:h-16 md:w-16">
                    <stat.icon
                      className="h-7 w-7 md:h-8 md:w-8"
                      style={{ color: "#0175D9" }}
                    />
                  </div>
                  <div className="mb-2 text-3xl font-bold tracking-tight text-white tabular-nums md:text-4xl lg:text-5xl">
                    {stat.value}
                  </div>
                  <div className="mb-1 text-sm font-semibold text-white md:text-base">
                    {stat.label}
                  </div>
                  <div className="text-xs font-medium text-[#94A3B8] md:text-sm">
                    {stat.growth}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
