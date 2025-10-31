// src/app/(public)/layout.tsx
import { ReactNode } from 'react';
import Header from './_components/Header';
import Footer from './_components/Footer';
import WhatsAppButton from './_components/WhatsAppButton';
import './public-layout.css'; // 👈 nuevo archivo que creamos

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="public-layout text-white flex flex-col min-h-screen">
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
