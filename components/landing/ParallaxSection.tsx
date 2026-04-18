"use client"
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import { Scan, Calculator, TrendingUp } from "lucide-react"
import Image from "next/image"

export function ParallaxSection() {
  const ref1 = useRef(null)
  const ref2 = useRef(null)

  const { scrollYProgress: scrollYProgress1 } = useScroll({
    target: ref1,
    offset: ["start end", "end start"],
  })

  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: ref2,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress1, [0, 1], [50, -50])
  const opacity1 = useTransform(
    scrollYProgress1,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  )

  const y2 = useTransform(scrollYProgress2, [0, 1], [-50, 50])
  const opacity2 = useTransform(
    scrollYProgress2,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  )

  return (
    <>
      {/* Section 1: OCR Scanning */}
      <section className="flex min-h-screen snap-start items-center py-12 md:py-24">
        <div ref={ref1} className="w-full overflow-hidden px-4 sm:px-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="order-2 text-center lg:order-1 lg:text-left"
              >
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0175D9]/30 bg-[#0175D9]/10 px-4 py-2 backdrop-blur-md">
                  <Scan className="h-4 w-4" style={{ color: "#0175D9" }} />
                  <span
                    className="text-xs font-medium sm:text-sm"
                    style={{ color: "#0175D9" }}
                  >
                    Tecnología OCR
                  </span>
                </div>

                <h2 className="mb-6 text-3xl leading-tight font-bold text-white sm:text-4xl md:text-5xl">
                  Escanea facturas en{" "}
                  <span className="text-[#0175D9]">segundos</span>
                </h2>

                <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-[#94A3B8] sm:text-lg lg:mx-0">
                  Nuestra IA no solo lee tu ticket, sino que entiende el
                  contexto legal. Te dirá instantáneamente si ese gasto es
                  deducible.
                </p>

                <ul className="mx-auto mb-8 max-w-md space-y-4 text-left lg:mx-0">
                  {[
                    "Reconocimiento de texto (OCR)",
                    "Validación legal en tiempo real",
                    "Clasificación inteligente",
                    "Almacenamiento seguro",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-3 text-white/90"
                    >
                      <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#0175D9]/20">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#0175D9]"></div>
                      </div>
                      <span className="text-sm sm:text-base">{item}</span>
                    </motion.li>
                  ))}
                </ul>

                <button className="w-full rounded-xl bg-[#0175D9] px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all active:scale-95 sm:w-auto">
                  Probar ahora
                </button>
              </motion.div>

              {/* Image Container */}
              <motion.div
                style={{ y: y1, opacity: opacity1 }}
                className="relative order-1 lg:order-2"
              >
                <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                  <Image
                    src="/Imagenes/finance-image.jpg"
                    alt="OCR Analysis"
                    width={800}
                    height={600}
                    className="h-auto w-full object-cover"
                    priority
                  />
                  <div className="absolute inset-0 z-10 bg-gradient-to-tr from-blue-600/20 to-transparent"></div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="absolute -bottom-4 -left-4 z-20 rounded-2xl border border-[#0175D9]/30 bg-[#002761]/80 p-4 shadow-xl backdrop-blur-xl sm:-bottom-6 sm:-left-6 sm:p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0175D9]/20 sm:h-12 sm:w-12">
                      <TrendingUp className="h-5 w-5 text-[#0175D9] sm:h-6 sm:w-6" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-white sm:text-2xl">
                        99.9%
                      </div>
                      <div className="text-xs text-[#94A3B8] sm:text-sm">
                        Precisión OCR
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Tax Calculations */}
      <section className="flex min-h-screen snap-start items-center py-12 md:py-24">
        <div ref={ref2} className="w-full px-4 sm:px-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              {/* Image Container */}
              <motion.div
                style={{ y: y2, opacity: opacity2 }}
                className="relative order-1"
              >
                <div className="relative rounded-2xl border border-white/10 shadow-2xl">
                  <Image
                    src="/Imagenes/finance-image-2.jpg"
                    alt="Tax Calculations"
                    width={800}
                    height={600}
                    className="h-auto w-full rounded-2xl object-cover"
                  />
                  <div className="absolute inset-0 z-10 bg-gradient-to-tl from-blue-600/20 to-transparent"></div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="absolute -top-4 -right-4 z-20 rounded-2xl border border-[#0175D9]/30 bg-[#002761]/80 p-4 shadow-xl backdrop-blur-xl sm:-top-6 sm:-right-6 sm:p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0175D9]/20 sm:h-12 sm:w-12">
                      <Calculator className="h-5 w-5 text-[#0175D9] sm:h-6 sm:w-6" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-white sm:text-2xl">
                        $15K
                      </div>
                      <div className="text-xs text-[#94A3B8] sm:text-sm">
                        Ahorro promedio
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="order-2 text-center lg:text-left"
              >
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0175D9]/30 bg-[#0175D9]/10 px-4 py-2 backdrop-blur-md">
                  <Calculator
                    className="h-4 w-4"
                    style={{ color: "#0175D9" }}
                  />
                  <span
                    className="text-xs font-medium sm:text-sm"
                    style={{ color: "#0175D9" }}
                  >
                    Cálculos Inteligentes
                  </span>
                </div>

                <h2 className="mb-6 text-3xl leading-tight font-bold text-white sm:text-4xl md:text-5xl">
                  Maximiza tus{" "}
                  <span className="text-[#0175D9]">deducciones</span>
                </h2>

                <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-[#94A3B8] sm:text-lg lg:mx-0">
                  No más hojas de cálculo. VanTax analiza tus gastos y te
                  muestra cuánto dinero puedes recuperar en tu declaración
                  anual.
                </p>

                <ul className="mx-auto mb-8 max-w-md space-y-4 text-left lg:mx-0">
                  {[
                    "Gastos médicos y dentales",
                    "Colegiaturas y educación",
                    "Intereses hipotecarios",
                    "Aportaciones para el retiro",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-3 text-white/90"
                    >
                      <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#0175D9]/20">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#0175D9]"></div>
                      </div>
                      <span className="text-sm sm:text-base">{item}</span>
                    </motion.li>
                  ))}
                </ul>

                <button className="w-full rounded-xl bg-[#0175D9] px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all active:scale-95 sm:w-auto">
                  Ver todas las deducciones
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
