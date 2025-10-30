// src/app/(public)/layout.tsx
import { ReactNode } from 'react';
import Header from './_components/Header';
import Footer from './_components/Footer';
import WhatsAppButton from './_components/WhatsAppButton';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    // 1. Aplicamos fondo móvil por defecto (bg-mobile-pattern)
    //    y el fondo de escritorio a partir de 'md' (md:bg-desktop-pattern).
    // 2. Establecemos el color de texto base en blanco/claro (text-white).
    <div 
      className="relative flex flex-col min-h-screen text-white 
                 bg-mobile-pattern md:bg-desktop-pattern 
                 bg-no-repeat bg-cover bg-center bg-fixed"
    >
      {/* 3. ELIMINADO el overlay oscuro (div con bg-black opacity-40) */}
      
      {/* 4. Header fijo y por encima de todo */}
      <header className="sticky top-0 z-50 w-full">
        <Header /> 
      </header>

      {/* 5. ELIMINADO el fondo oscuro del main (bg-black/10, backdrop-blur, etc.) */}
      <main className="flex-grow container mx-auto px-6 py-8 relative z-10"> 
        {children}
      </main>

      {/* 6. Footer con z-index */}
      <footer className="z-10">
        <Footer />
      </footer>

      <WhatsAppButton /> 
    </div>
  );
}