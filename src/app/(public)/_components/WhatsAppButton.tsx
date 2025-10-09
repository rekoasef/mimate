// src/app/(public)/_components/WhatsAppButton.tsx
'use client'

import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa'; // 1. Importamos el icono específico

export default function WhatsAppButton() {
  const phoneNumber = '543471339026'; // Reemplaza con tu número
  const message = encodeURIComponent('Hola, ¡estoy interesado en sus productos! Me gustaría recibir más información.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <Link 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-transform hover:scale-110 z-50 flex items-center justify-center"
      aria-label="Contactar por WhatsApp"
    >
      {/* 2. Usamos el componente del icono */}
      <FaWhatsapp size={28} />
    </Link>
  );
}