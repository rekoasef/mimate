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
          accent: '#8C6E54',
          bg: '#EAE0D1', // Cambiamos a un fondo casi blanco, más elegante
          surface: '#FFFFFF',
          text: '#3A4D40',
          'text-light': '#F1F2EB'
        }
      },
      // --- AÑADE ESTE BLOQUE DE FUENTES ---
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      // --- FIN DEL BLOQUE ---
    },
  },
  plugins: [],
}
export default config