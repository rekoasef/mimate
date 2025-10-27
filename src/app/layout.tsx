// src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Montserrat, Playfair_Display } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Mimate',
  description: 'Catálogo de productos Mimate',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      {/* 1. Eliminamos el atributo 'style' que añadía la imagen de fondo.
        2. Añadimos de nuevo la clase 'bg-brand-bg' para usar el color de Tailwind.
      */}
      <body className={`${montserrat.variable} ${playfair.variable} font-sans bg-brand-bg text-brand-text`}>
        {children}
      </body>
    </html>
  )
}