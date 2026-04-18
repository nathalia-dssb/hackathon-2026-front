export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Animated Blob 1 */}
      <div
        className="absolute animate-blob"
        style={{
          top: '10%',
          left: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(1, 117, 217, 0.4) 0%, rgba(1, 117, 217, 0) 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'blob 20s infinite'
        }}
      ></div>

      {/* Animated Blob 2 */}
      <div
        className="absolute animate-blob animation-delay-2000"
        style={{
          top: '60%',
          right: '10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0, 39, 97, 0.5) 0%, rgba(0, 39, 97, 0) 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'blob 25s infinite 2s'
        }}
      ></div>

      {/* Animated Blob 3 */}
      <div
        className="absolute animate-blob animation-delay-4000"
        style={{
          bottom: '10%',
          left: '30%',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(1, 117, 217, 0.3) 0%, rgba(1, 117, 217, 0) 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'blob 22s infinite 4s'
        }}
      ></div>

      {/* Animated Blob 4 */}
      <div
        className="absolute animate-blob animation-delay-6000"
        style={{
          top: '40%',
          right: '40%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(0, 39, 97, 0.4) 0%, rgba(0, 39, 97, 0) 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'blob 28s infinite 6s'
        }}
      ></div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(50px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-30px, 40px) scale(0.95);
          }
          75% {
            transform: translate(40px, 30px) scale(1.05);
          }
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animation-delay-6000 {
          animation-delay: 6s;
        }
      `}</style>
    </div>
  );
}
