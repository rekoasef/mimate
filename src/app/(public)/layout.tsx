// src/app/(public)/layout.tsx
import { ReactNode } from 'react';
import Header from './_components/Header';
import Footer from './_components/Footer';
import WhatsAppButton from './_components/WhatsAppButton'; // Asegúrate de que esta línea exista

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-8">
        {children}
      </main>
      <Footer />
      
      {/* El botón se coloca aquí para asegurar que esté por encima de todo */}
      <WhatsAppButton /> 
    </div>
  );
}