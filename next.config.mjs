/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack ya viene activado en tu versión
  async rewrites() {
    return [
      {
        // Esto crea un túnel: de /backend-api/... a Railway
        source: '/backend-api/:path*',
        destination: process.env.NEXT_PUBLIC_BACKAPI + '/:path*',
      },
    ];
  },
};

export default nextConfig;
