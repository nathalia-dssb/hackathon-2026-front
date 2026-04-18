"use client";
import { ArrowRight, Check } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function CTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section ref={ref} className="snap-start min-h-screen flex items-center py-12 md:py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Floating decorative elements - Hidden on small mobile to reduce clutter */}
      <motion.div
        style={{ y, rotate }}
        className="absolute top-20 right-10 w-32 h-32 rounded-full opacity-10 pointer-events-none hidden sm:block"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      >
        <div className="w-full h-full rounded-full border-4" style={{ borderColor: '#0175D9' }}></div>
      </motion.div>

      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-80, 80]) }}
        className="absolute bottom-20 left-10 w-24 h-24 rounded-full opacity-10 pointer-events-none hidden sm:block"
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          delay: 1,
        }}
      >
        <div className="w-full h-full rounded-full border-4" style={{ borderColor: '#0175D9' }}></div>
      </motion.div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-8 md:p-16 lg:p-20 border relative overflow-hidden backdrop-blur-xl shadow-2xl"
          style={{
            backgroundColor: 'rgba(0, 39, 97, 0.6)',
            borderColor: 'rgba(1, 117, 217, 0.4)'
          }}
        >
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6 font-bold tracking-tight leading-tight"
            >
              ¿Cuánto dinero has dejado en la mesa?
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base sm:text-lg md:text-xl mb-10 text-[#94A3B8] leading-relaxed"
            >
              Miles de jóvenes profesionales pierden dinero cada año por no conocer el sistema fiscal mexicano. No seas uno de ellos.
            </motion.p>

            {/* Features List */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10"
            >
              {[
                'Escanea facturas con IA', 
                'Asistente fiscal 24/7', 
                'Actualizaciones SAT'
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10"
                >
                  <Check className="w-5 h-5 flex-shrink-0" style={{ color: '#0175D9' }} />
                  <span className="text-white text-sm sm:text-base font-medium">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 50px rgba(1, 117, 217, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-white flex items-center justify-center gap-2 transition-all shadow-xl relative overflow-hidden group bg-[#0175D9] font-bold"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  style={{ width: '50%' }}
                />
                <span className="relative z-10">Recupera tu dinero</span>
                <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-white border border-white/20 backdrop-blur-md transition-all font-bold"
              >
                Ver cómo funciona
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
