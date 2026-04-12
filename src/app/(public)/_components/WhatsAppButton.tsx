'use client'

import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

const PHONE = '543471339026';

export default function WhatsAppButton() {
  const message = encodeURIComponent('¡Hola! Quisiera consultar sobre sus productos.');
  const whatsappUrl = `https://wa.me/${PHONE}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip */}
      <span className="hidden sm:block bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mr-1">
        ¿Necesitás ayuda?
      </span>
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 active:scale-95"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30" />
        <FaWhatsapp size={30} />
      </Link>
    </div>
  );
}
