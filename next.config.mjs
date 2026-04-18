/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack ya viene activado en tu versión
  async rewrites() {
    return [
      {
        // Esto crea un túnel: de /backend-api/... a Railway
        source: '/backend-api/:path*',
        destination: 'https://proyecto-hackathon-2026-back-production.up.railway.app/:path*',
      },
    ];
  },
};

export default nextConfig;