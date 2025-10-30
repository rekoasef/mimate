// src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
// 1. Asegúrate que las fuentes sean las correctas (Fredoka)
import { Montserrat, Fredoka } from 'next/font/google' 

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })
const fredoka = Fredoka({ 
  subsets: ['latin'], 
  weight: '400',
  variable: '--font-fredoka' 
}) 

export const metadata: Metadata = {
  title: 'Mimate',
  description: 'Catálogo de productos Mimate',
  // --- ¡ESTA ES LA LÍNEA CRÍTICA QUE ARREGLA EL MÓVIL! ---
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      {/* Este body define el fondo claro (bg-brand-bg) por defecto.
        Esto se aplicará al Panel de Admin y al Login.
        El layout público (siguiente archivo) sobreescribirá esto.
      */}
      <body className={`${montserrat.variable} ${fredoka.variable} font-sans bg-brand-bg text-brand-text`}>
        {children}
      </body>
    </html>
  )
}