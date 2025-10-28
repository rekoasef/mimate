// src/app/(public)/layout.tsx
import { ReactNode } from 'react';
import Header from './_components/Header';
import Footer from './_components/Footer';
import WhatsAppButton from './_components/WhatsAppButton';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    // Div principal con el fondo de imagen
    <div 
      className="relative flex flex-col min-h-screen text-white" // 'relative' para el overlay 'absolute'
      style={{
        backgroundImage: 'url(/pattern-background-green.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center center'
      }}
    >
      {/* Overlay oscuro semi-transparente */}
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div> {/* Ajusta 'opacity-40' si quieres */}
      
      {/* --- CORRECCIÓN AQUÍ --- */}
      {/* Envolvemos Header en <header> y le aplicamos z-10 */}
      <header className="z-10 sticky top-0"> {/* Hacemos el header wrapper sticky */}
        <Header /> 
      </header>
      {/* --- FIN CORRECCIÓN --- */}

      {/* Main sigue igual con z-10 */}
      <main className="flex-grow container mx-auto px-6 py-8 bg-black/10 backdrop-blur-xs rounded-lg my-8 z-10"> 
        {children}
      </main>

      {/* --- CORRECCIÓN AQUÍ --- */}
      {/* Envolvemos Footer en <footer> y le aplicamos z-10 */}
      <footer className="z-10">
        <Footer />
      </footer>
      {/* --- FIN CORRECCIÓN --- */}

      <WhatsAppButton /> {/* Este ya debería tener z-index alto */}
    </div>
  );
}