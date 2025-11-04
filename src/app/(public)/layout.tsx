// src/app/(public)/layout.tsx
import { ReactNode } from 'react';
import Header from './_components/Header';
import Footer from './_components/Footer';
import WhatsAppButton from './_components/WhatsAppButton';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen text-brand-text-light">
      
      <div 
        className="fixed inset-0 z-0
                   bg-mobile-pattern md:bg-desktop-pattern 
                   bg-no-repeat bg-cover bg-center"
      />
      
      {/* 3. AJUSTE AQUÍ: Cambiamos la opacidad del overlay */}
      <div className="fixed inset-0 bg-black opacity-40 z-10" /> 
      {/* Puedes probar con:
          - opacity-10 (muy poco oscuro)
          - opacity-20 (un poco oscuro)
          - opacity-0 (elimina el overlay, es como si no estuviera)
          - O simplemente borrar la línea entera del div si quieres quitarlo
      */}

      <div className="relative z-20 flex flex-col min-h-screen">
        
        <header className="sticky top-0 z-50 w-full">
          <Header /> 
        </header>

        <main className="flex-grow container mx-auto px-6 py-8"> 
          {children}
        </main>

        <footer className="z-30">
          <Footer />
        </footer>
        
      </div>

      <WhatsAppButton /> 
    </div>
  );
}