// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#5D7A68',
          secondary: '#3A4D40',
          accent: '#5D4037',    // Marrón oscuro
          bg: '#EAE0D1',        // Beige claro
          surface: '#FFFFFF',
          text: '#3A4D40',      // Verde Oscuro (texto base para admin)
          'text-light': '#F1F2EB', // Blanco crema
          'text-dark-brown': '#5D4037' // Marrón Oscuro (para títulos públicos)
        }
      },
      fontFamily: {
        // ACTUALIZADO: Usa la variable CSS de Fredoka One para 'serif'
        serif: ['var(--font-fredoka)', 'serif'],
        sans: ['var(--font-montserrat)', 'sans-serif'], // Usamos la variable para Montserrat también
      },
    },
  },
  plugins: [],
}
export default config