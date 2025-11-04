// src/app/(public)/layout.tsx
import { ReactNode } from 'react';
import Header from './_components/Header';
import Footer from './_components/Footer';
import WhatsAppButton from './_components/WhatsAppButton';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    // --- ESTA ES LA LÍNEA MÁGICA Y CORREGIDA ---
    <div 
      className="relative flex flex-col min-h-screen text-brand-text-light 
                 bg-center bg-mobile-pattern bg-repeat bg-scroll 
                 md:bg-desktop-pattern md:bg-no-repeat md:bg-cover md:bg-fixed"
    >
      {/* Desglose de la corrección:
        - bg-mobile-pattern: Imagen por defecto (móvil)
        - bg-repeat:         Repetir por defecto (móvil)
        - bg-scroll:         Scroll por defecto (móvil)
        - md:bg-desktop-pattern: Cambia la imagen en escritorio
        - md:bg-no-repeat:       DEJA de repetir en escritorio
        - md:bg-cover:           CUBRE la pantalla en escritorio
        - md:bg-fixed:           DEJA fijo el fondo en escritorio
      */}
      
      {/* ELIMINADO: El overlay 'bg-black opacity-40' */}
      
      <header className="sticky top-0 z-50 w-full">
        <Header /> 
      </header>

      {/* ELIMINADO: El recuadro oscuro ('bg-black/10', 'backdrop-blur', etc.) */}
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