"use client";

export function FixedBackground() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none" 
      style={{ 
        zIndex: -1,
        backgroundImage: `
          radial-gradient(circle at 10% 20%, rgba(0, 39, 97, 0.6) 0%, transparent 40%),
          radial-gradient(circle at 90% 80%, rgba(1, 117, 217, 0.4) 0%, transparent 40%),
          radial-gradient(circle at 50% 50%, rgba(0, 39, 97, 0.2) 0%, transparent 60%),
          radial-gradient(circle at 80% 10%, rgba(1, 117, 217, 0.3) 0%, transparent 30%)
        `,
        backgroundColor: '#02011A'
      }}
    />
  );
}
