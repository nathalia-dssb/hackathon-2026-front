"use client"
import { motion } from "motion/react"
import { Hero } from "@/components/landing/Hero"
import { Features } from "@/components/landing/Features"
import { ParallaxSection } from "@/components/landing/ParallaxSection"
import { Stats } from "@/components/landing/Stats"
import { Testimonials } from "@/components/landing/Testimonials"
import { CTA } from "@/components/landing/CTA"
import { Footer } from "@/components/landing/Footer"
import { AnimatedBackground } from "@/components/landing/AnimatedBackground"
import { FloatingElements } from "@/components/landing/FloatingElements"
import { SmoothScroll } from "@/components/landing/SmoothScroll"

export default function Page() {
  return (
    <SmoothScroll>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-screen px-4 md:px-18"
        style={{ backgroundColor: "#02011A" }}
      >
        <AnimatedBackground />
        <FloatingElements />
        <div className="relative z-10">
          <Hero />
          <Features />
          <ParallaxSection />
          <Stats />
          <Testimonials />
          <CTA />
          <Footer />
        </div>
      </motion.div>
    </SmoothScroll>
  )
}
