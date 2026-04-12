// src/app/(public)/_components/Footer.tsx
import Link from 'next/link';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

const PHONE = '543471339026';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-16 py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="font-serif text-xl font-bold text-white">Mimate</p>
            <p className="text-white/50 text-xs mt-1">Mates artesanales únicos</p>
          </div>

          {/* Links */}
          <nav className="flex gap-6 text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            <Link href="/catalogo" className="hover:text-white transition-colors">
              Catálogo
            </Link>
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href={`https://wa.me/${PHONE}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-white/50 hover:text-green-400 transition-colors"
            >
              <FaWhatsapp size={22} />
            </a>
            <a
              href="mailto:mimatearms@gmail.com"
              className="text-white/50 hover:text-white transition-colors text-sm"
            >
              mimatearms@gmail.com
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Mimate. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
