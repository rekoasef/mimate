// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  // --- AÑADE ESTE BLOQUE COMPLETO ---
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ufpbaomchfeqxzmusrjz.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/product_images/**',
      },
    ],
  },
  // --- FIN DEL BLOQUE ---
}

module.exports = nextConfig