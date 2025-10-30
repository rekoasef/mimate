// src/app/(public)/layout.tsx
import { ReactNode } from 'react';
import Header from './_components/Header';
import Footer from './_components/Footer';
import WhatsAppButton from './_components/WhatsAppButton';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    // 1. Aplicamos el fondo y el layout base.
    //    Quitamos 'text-white' para que cada página defina su color de texto.
    <div 
      className="relative flex flex-col min-h-screen 
                 bg-main-pattern bg-no-repeat bg-cover bg-center bg-fixed"
    >
      {/* 2. ELIMINADO: El overlay oscuro (div con bg-black opacity-40) ya no está. */}
      
      {/* 3. Header fijo y por encima de todo */}
      <header className="sticky top-0 z-50 w-full">
        <Header /> 
      </header>

      {/* 4. Main sin fondo oscuro ni blur. Esta es la "sombra cuadrada" que eliminamos. */}
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