// src/app/(public)/_components/Header.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    // CAMBIO: Opacidad reducida de bg-brand-bg/80 a bg-brand-bg/50
    <header className="bg-brand-bg/5 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-6 py-1 flex justify-between items-center border-b border-gray-200/30"> {/* Borde aún más sutil */}
        <Link href="/">
          <Image
            src="/logo.png" // Asegúrate que esta ruta sea correcta
            alt="Mimate Logo"
            width={250}
            height={180}
            priority
          />
        </Link>
        {/* Asegúrate que el color de texto siga contrastando */}
        <nav className="space-x-8 font-semibold text-sm tracking-wider uppercase text-white">
          <Link href="/" className="hover:text-brand-primary transition-colors">Inicio</Link>
          <Link href="/catalogo" className="hover:text-brand-primary transition-colors">Catálogo</Link>
        </nav>
      </div>
    </header>
  );
}