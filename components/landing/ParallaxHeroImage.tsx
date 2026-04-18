"use client";
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function ParallaxHeroImage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.15, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        style={{ y, opacity, scale }}
        className="absolute inset-0"
      >
        {/* Decorative gradient overlay that moves */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 30% 50%, rgba(1, 117, 217, 0.15) 0%, transparent 50%)',
          }}
        />

        {/* Animated grid pattern */}
        <motion.div
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(1, 117, 217, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(1, 117, 217, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </motion.div>
    </div>
  );
}
