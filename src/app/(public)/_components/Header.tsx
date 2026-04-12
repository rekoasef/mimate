// src/app/(public)/_components/Header.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
      <div className="container mx-auto px-6 py-2 flex justify-between items-center">
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.png"
            alt="Mimate Logo"
            width={220}
            height={160}
            priority
            className="h-auto"
          />
        </Link>

        <nav className="flex items-center gap-6 lg:gap-8">
          <Link
            href="/"
            className="font-semibold text-sm tracking-wider uppercase text-white/80 hover:text-white transition-colors"
          >
            Inicio
          </Link>
          <Link
            href="/catalogo"
            className="font-semibold text-sm tracking-wider uppercase text-white/80 hover:text-white transition-colors"
          >
            Catálogo
          </Link>
          <a
            href="https://wa.me/543471339026?text=¡Hola! Quisiera consultar sobre sus productos."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-full transition-all hover:scale-105"
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
