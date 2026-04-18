import { motion } from 'motion/react';

export function FloatingElements() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            backgroundColor: 'rgba(1, 117, 217, 0.4)',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Floating rings */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute rounded-full border"
          style={{
            width: Math.random() * 200 + 100 + 'px',
            height: Math.random() * 200 + 100 + 'px',
            borderColor: 'rgba(1, 117, 217, 0.1)',
            borderWidth: '1px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}
