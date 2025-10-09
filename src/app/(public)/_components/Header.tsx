// src/app/(public)/_components/Header.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-brand-bg/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Mimate Logo"
            width={120}
            height={40}
            priority
          />
        </Link>
        <nav className="space-x-8 font-semibold text-sm tracking-wider uppercase">
          <Link href="/" className="hover:text-brand-primary transition-colors">Inicio</Link>
          <Link href="/catalogo" className="hover:text-brand-primary transition-colors">Catálogo</Link>
        </nav>
      </div>
    </header>
  );
}