// src/app/(public)/layout.tsx
import { ReactNode } from 'react';
import Header from './_components/Header';
import Footer from './_components/Footer';
import WhatsAppButton from './_components/WhatsAppButton';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    // Aplicamos el nuevo fondo y eliminamos el overlay de opacidad global
    <div 
      className="relative flex flex-col min-h-screen text-white 
                 bg-main-pattern bg-no-repeat bg-cover bg-center bg-fixed" 
      // El estilo inline ya no es necesario
    >
      {/* Eliminamos el div del overlay oscuro global (bg-black opacity-40)
          porque con el nuevo fondo más claro, ya no debería ser necesario
          y el texto blanco debería leerse bien directamente sobre él. */}
      
      {/* Contenido (Header, Main, Footer) - ahora con un <main> sin el recuadro oscuro */}
      <header className="z-10 sticky top-0">
        <Header /> 
      </header>
      {/* Eliminamos las clases bg-black/10 backdrop-blur-xs rounded-lg my-8 de <main>
          Esto es lo que causaba la "sombra cuadrada" */}
      <main className="flex-grow container mx-auto px-6 py-8 z-10"> 
        {children}
      </main>
      <footer className="z-10">
        <Footer />
      </footer>
      <WhatsAppButton /> 
    </div>
  );
}