// src/app/(public)/layout.tsx
import { ReactNode } from 'react';
import Header from './_components/Header';
import Footer from './_components/Footer';
import WhatsAppButton from './_components/WhatsAppButton';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex flex-col min-h-screen text-white overflow-hidden">
      {/* Fondo real como imagen */}
      <div className="absolute inset-0 -z-10">
        <picture>
          <source media="(min-width: 768px)" srcSet="/background-desktop-pattern.jpg" />
          <img
            src="/background-mobile-pattern.jpg"
            alt="Fondo textura Mimate"
            className="w-full h-full object-cover"
          />
        </picture>
      </div>

      <header className="sticky top-0 z-50 w-full">
        <Header />
      </header>

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
