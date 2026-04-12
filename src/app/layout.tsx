// src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Montserrat, Fredoka } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })
const fredoka = Fredoka({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-fredoka',
})

export const metadata: Metadata = {
  title: {
    default: 'Mimate | Mates artesanales únicos',
    template: '%s | Mimate',
  },
  description:
    'Descubrí nuestra colección de mates artesanales. Seleccionados con cuidado y amor, para acompañarte en cada momento.',
  keywords: ['mate', 'mates', 'mates artesanales', 'comprar mate', 'mimate'],
  openGraph: {
    title: 'Mimate | Mates artesanales únicos',
    description:
      'Descubrí nuestra colección de mates artesanales. Seleccionados con cuidado y amor.',
    type: 'website',
    locale: 'es_AR',
    siteName: 'Mimate',
  },
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body
        className={`${montserrat.variable} ${fredoka.variable} font-sans bg-brand-bg text-brand-text`}
      >
        {children}
      </body>
    </html>
  )
}
