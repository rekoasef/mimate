// src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
// 1. Cambia Fredoka_One a Fredoka
import { Montserrat, Fredoka } from 'next/font/google' 

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })
// 2. Usa Fredoka y actualiza la variable y el nombre
const fredoka = Fredoka({ 
  subsets: ['latin'], 
  weight: '400', // Fredoka sí tiene pesos, 400 es el regular
  variable: '--font-fredoka' 
}) 

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
      <body 
        // 3. Usa la variable fredoka.variable
        className={`${montserrat.variable} ${fredoka.variable} font-sans min-h-screen flex flex-col`} 
        style={{
          backgroundImage: 'url(/pattern-background-green.jpg)', 
          backgroundRepeat: 'no-repeat',         
          backgroundSize: 'cover',             
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center center' 
        }}
      >
        <div className="text-white flex flex-col flex-grow"> 
          {children}
        </div>
      </body>
    </html>
  )
}