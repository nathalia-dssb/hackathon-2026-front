"use client"

import {
  FacebookLogoIcon,
  LinkedinLogoIcon,
  TwitterLogoIcon,
} from "@phosphor-icons/react"
import { Mail } from "lucide-react"
import { motion } from "motion/react"

const logo = "/Imagenes/vantax_logo.svg"

export function Footer() {
  return (
    <footer
      className="border-t px-6 py-16 backdrop-blur-md"
      style={{ borderColor: "rgba(1, 117, 217, 0.2)" }}
    >
      <div className="container mx-auto">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img src={logo} alt="VanTax MX" className="h-8" />
            </div>
            <p className="mb-6" style={{ color: "#94A3B8", lineHeight: "1.6" }}>
              Ayudamos a jóvenes profesionales a recuperar miles en devoluciones
              de impuestos usando inteligencia artificial.
            </p>
            <div className="flex gap-3">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -3 }}
                className="flex h-10 w-10 items-center justify-center rounded-lg backdrop-blur-sm transition-all"
                style={{
                  backgroundColor: "rgba(0, 39, 97, 0.5)",
                  border: "1px solid rgba(1, 117, 217, 0.2)",
                }}
              >
                <TwitterLogoIcon
                  className="h-5 w-5"
                  style={{ color: "#94A3B8" }}
                />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -3 }}
                className="flex h-10 w-10 items-center justify-center rounded-lg backdrop-blur-sm transition-all"
                style={{
                  backgroundColor: "rgba(0, 39, 97, 0.5)",
                  border: "1px solid rgba(1, 117, 217, 0.2)",
                }}
              >
                <LinkedinLogoIcon
                  className="h-5 w-5"
                  style={{ color: "#94A3B8" }}
                />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -3 }}
                className="flex h-10 w-10 items-center justify-center rounded-lg backdrop-blur-sm transition-all"
                style={{
                  backgroundColor: "rgba(0, 39, 97, 0.5)",
                  border: "1px solid rgba(1, 117, 217, 0.2)",
                }}
              >
                <FacebookLogoIcon
                  className="h-5 w-5"
                  style={{ color: "#94A3B8" }}
                />
              </motion.a>
            </div>
          </div>

          {/* Producto */}
          <div>
            <h4 className="mb-4 text-white" style={{ fontWeight: "600" }}>
              Producto
            </h4>
            <ul className="space-y-3">
              <li>
                <motion.a
                  href="#"
                  whileHover={{ x: 5, color: "#ffffff" }}
                  className="inline-block transition-all"
                  style={{ color: "#94A3B8" }}
                >
                  Escaneo OCR
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  whileHover={{ x: 5, color: "#ffffff" }}
                  className="inline-block transition-all"
                  style={{ color: "#94A3B8" }}
                >
                  Chat Fiscal IA
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  whileHover={{ x: 5, color: "#ffffff" }}
                  className="inline-block transition-all"
                  style={{ color: "#94A3B8" }}
                >
                  Deducciones
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  whileHover={{ x: 5, color: "#ffffff" }}
                  className="inline-block transition-all"
                  style={{ color: "#94A3B8" }}
                >
                  Calculadora ISR
                </motion.a>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="mb-4 text-white" style={{ fontWeight: "600" }}>
              Recursos
            </h4>
            <ul className="space-y-3">
              <li>
                <motion.a
                  href="#"
                  whileHover={{ x: 5, color: "#ffffff" }}
                  className="inline-block transition-all"
                  style={{ color: "#94A3B8" }}
                >
                  Guía de Deducciones
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  whileHover={{ x: 5, color: "#ffffff" }}
                  className="inline-block transition-all"
                  style={{ color: "#94A3B8" }}
                >
                  Blog Fiscal
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  whileHover={{ x: 5, color: "#ffffff" }}
                  className="inline-block transition-all"
                  style={{ color: "#94A3B8" }}
                >
                  Preguntas SAT
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  whileHover={{ x: 5, color: "#ffffff" }}
                  className="inline-block transition-all"
                  style={{ color: "#94A3B8" }}
                >
                  Soporte
                </motion.a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-white" style={{ fontWeight: "600" }}>
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <motion.a
                  href="#"
                  whileHover={{ x: 5, color: "#ffffff" }}
                  className="inline-block transition-all"
                  style={{ color: "#94A3B8" }}
                >
                  Privacidad
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  whileHover={{ x: 5, color: "#ffffff" }}
                  className="inline-block transition-all"
                  style={{ color: "#94A3B8" }}
                >
                  Términos
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  whileHover={{ x: 5, color: "#ffffff" }}
                  className="inline-block transition-all"
                  style={{ color: "#94A3B8" }}
                >
                  Cookies
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  whileHover={{ x: 5, color: "#ffffff" }}
                  className="inline-block transition-all"
                  style={{ color: "#94A3B8" }}
                >
                  Licencias
                </motion.a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row"
          style={{ borderColor: "#002761" }}
        >
          <p style={{ color: "#94A3B8" }}>
            © 2026 VanTax MX. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" style={{ color: "#94A3B8" }} />
            <a href="mailto:hola@vantax.mx" style={{ color: "#94A3B8" }}>
              hola@vantax.mx
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
