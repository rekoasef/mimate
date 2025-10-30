// src/app/(public)/layout.tsx
import { ReactNode } from 'react';
import Header from './_components/Header';
import Footer from './_components/Footer';
import WhatsAppButton from './_components/WhatsAppButton';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    // 1. ELIMINADO 'bg-fixed' DE ESTA LÍNEA
    <div 
      className="relative flex flex-col min-h-screen text-white 
                 bg-mobile-pattern md:bg-desktop-pattern 
                 bg-no-repeat bg-cover bg-center"
    >
      {/* 2. El overlay oscuro se mantiene por ahora para legibilidad */}
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
      
      {/* 3. Header fijo y por encima de todo */}
      <header className="sticky top-0 z-50 w-full">
        <Header /> 
      </header>

      {/* 4. Main sin fondo oscuro ni blur */}
      <main className="flex-grow container mx-auto px-6 py-8 relative z-10"> 
        {children}
      </main>

      {/* 5. Footer con z-index */}
      <footer className="z-10">
        <Footer />
      </footer>

      <WhatsAppButton /> 
    </div>
  );
}