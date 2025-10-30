// src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
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
  // --- AÑADE ESTA LÍNEA ESENCIAL ---
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body 
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