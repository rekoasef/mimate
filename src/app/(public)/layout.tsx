// src/app/(public)/layout.tsx
import { ReactNode } from 'react';
import Header from './_components/Header';
import Footer from './_components/Footer';
import WhatsAppButton from './_components/WhatsAppButton';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div 
      className="relative flex flex-col min-h-screen text-white 
                 bg-mobile-pattern md:bg-desktop-pattern 
                 bg-no-repeat bg-cover bg-center 
                 md:bg-fixed bg-scroll" // <- FIX: evita que se rompa en móviles
    >
      {/* Header fijo y visible */}
      <header className="sticky top-0 z-50 w-full">
        <Header /> 
      </header>

      {/* Main: mantiene el fondo visible detrás del contenido */}
      <main className="flex-grow container mx-auto px-6 py-8 relative z-10"> 
        {children}
      </main>

      <footer className="z-10">
        <Footer />
      </footer>

      <WhatsAppButton /> 
    </div>
  );
}
