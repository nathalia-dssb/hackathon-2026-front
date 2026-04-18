"use client";
import { Camera, MessageSquare, Shield, Sparkles, Bell, TrendingUp } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const features = [
  {
    icon: Camera,
    title: 'Escaneo inteligente (OCR)',
    description: 'Toma foto a tus tickets y facturas. Nuestra IA los procesa instantáneamente.'
  },
  {
    icon: MessageSquare,
    title: 'Asistente fiscal con IA',
    description: 'Chatea con tu agente fiscal personal. Responde dudas y analiza gastos.'
  },
  {
    icon: Sparkles,
    title: 'Análisis de deducciones',
    description: 'Identifica automáticamente gastos médicos, dentales, educativos y más.'
  },
  {
    icon: TrendingUp,
    title: 'Gestión de ingresos extra',
    description: 'Maneja múltiples fuentes de ingreso. Calcula impuestos de emprendimientos.'
  },
  {
    icon: Bell,
    title: 'Actualizaciones legales',
    description: 'Te alertamos cuando cambia la Miscelánea Fiscal. Mantente al día.'
  },
  {
    icon: Shield,
    title: 'Cumplimiento garantizado',
    description: 'Todos los cálculos basados en normativa vigente del SAT 2026.'
  }
];

export function Features() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <div ref={ref} className="py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden flex items-center min-h-screen">
      {/* Parallax background element */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 pointer-events-none opacity-20"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[800px] h-[300px] sm:h-[800px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(1, 117, 217, 0.2) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-4 font-bold">
            Deja de perder miles en devoluciones
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto text-[#94A3B8]">
            Tecnología de IA que entiende la complejidad fiscal mexicana y te ayuda a recuperar lo que te corresponde
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -5,
                borderColor: 'rgba(1, 117, 217, 0.6)',
                boxShadow: '0 20px 40px -12px rgba(1, 117, 217, 0.15)',
              }}
              className="p-6 md:p-8 rounded-2xl border backdrop-blur-md transition-all bg-[#002761]/30 border-[#0175D9]/20"
            >
              <div
                className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-4 md:mb-6 bg-[#0175D9]/20"
              >
                <feature.icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#0175D9' }} />
              </div>
              <h3 className="text-lg md:text-xl text-white mb-2 md:mb-3 font-semibold">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-[#94A3B8] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
