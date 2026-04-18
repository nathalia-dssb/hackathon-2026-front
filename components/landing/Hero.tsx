"use client"
import { ArrowRight, Shield, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useState } from "react"
import { ParallaxHeroImage } from "./ParallaxHeroImage"
import Link from "next/link"

const logo = "/Imagenes/vantax_logo.svg"

export function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { name: "Características", href: "#features" },
    { name: "Precios", href: "#pricing" },
    { name: "Acerca de", href: "#about" },
  ]

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault()
    setIsMenuOpen(false)

    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <ParallaxHeroImage />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 right-0 left-0 z-50 container mx-auto flex flex-row items-center justify-between bg-background/50 px-4 py-4 sm:px-6 md:py-6"
      >
        <div className="flex items-center gap-3">
          <motion.img
            src={logo}
            alt="VanTax MX"
            className="h-6 sm:h-8"
            animate={{
              filter: [
                "drop-shadow(0 0 0px rgba(1, 117, 217, 0.7))",
                "drop-shadow(0 0 10px rgba(1, 117, 217, 0.5))",
                "drop-shadow(0 0 0px rgba(1, 117, 217, 0.7))",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 rounded-full border border-white/10 bg-white/5 px-6 py-2 backdrop-blur-md md:flex">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{ scale: 1.05, color: "#ffffff" }}
              className="text-sm transition-colors"
              style={{ color: "#94A3B8" }}
            >
              {link.name}
            </motion.a>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full px-5 py-2 text-sm text-white shadow-lg shadow-blue-500/20 transition-all"
            style={{ backgroundColor: "#0175D9", fontWeight: "500" }}
          >
            Comenzar
          </motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="relative z-[60] p-2 text-white/80 hover:text-white md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#02011A] p-6 md:hidden"
            >
              <div className="flex flex-col items-center gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-2xl text-[#94A3B8] hover:text-white"
                    onClick={(e) => handleLinkClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                ))}
                <Link href="/login">
                <button className="w-full rounded-xl bg-[#0175D9] px-8 py-4 text-lg text-white">
                  Comenzar ahora
                </button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Content */}
      <div className="relative container mx-auto mt-20 flex flex-1 items-center justify-center px-4 py-12 sm:px-6 md:py-20">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0175D9]/30 bg-[#0175D9]/10 px-4 py-2 backdrop-blur-md"
          >
            <Shield className="h-4 w-4" style={{ color: "#0175D9" }} />
            <span
              className="text-xs font-medium sm:text-sm"
              style={{ color: "#0175D9" }}
            >
              Cumplimiento SAT actualizado 2026
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6 text-4xl tracking-tight text-white sm:text-5xl md:text-7xl"
            style={{ fontWeight: "700", lineHeight: "1.1" }}
          >
            Recupera miles en{" "}
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="bg-gradient-to-r from-[#0175D9] via-[#00A8FF] to-[#0175D9] bg-[length:200%_auto] bg-clip-text text-transparent"
            >
              devoluciones
            </motion.span>{" "}
            de impuestos
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-[#94A3B8] sm:text-lg md:text-xl"
          >
            La plataforma inteligente que te ayuda a maximizar tus deducciones
            personales y gestionar tus ingresos extra sin complicaciones.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#0175D9] px-8 py-4 font-semibold text-white shadow-xl shadow-blue-500/20 transition-all sm:w-auto"
            >
              <span>Escanear factura</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full rounded-xl border border-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all sm:w-auto"
            >
              Calcular saldo a favor
            </motion.button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 grid grid-cols-2 items-center justify-center gap-6 sm:mt-16 sm:gap-12 md:flex"
          >
            {[
              { label: "Promedio recuperado", val: "$15K" },
              { label: "Más deducciones", val: "400%" },
              { label: "Tiempo de proceso", val: "2 min" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-white sm:text-3xl">
                  {item.val}
                </div>
                <div className="text-xs text-[#94A3B8] sm:text-sm">
                  {item.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
