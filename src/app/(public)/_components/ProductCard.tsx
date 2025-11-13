// src/app/(public)/_components/ProductCard.tsx
'use client' 

import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion'; // Asegúrate de importar Variants

interface ProductCardProps {
  id: number;
  name: string;
  price: number; // Sigue recibiendo un número, ej: 28000
  imageUrl: string;
}

export default function ProductCard({ id, name, price, imageUrl }: ProductCardProps) {
  
  const cardVariants: Variants = { // Tipado explícito
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // --- ¡NUEVA LÓGICA DE FORMATO AQUÍ! ---
  // Formateamos el precio para Argentina (que usa '.' como separador de miles)
  // y eliminamos los decimales (centavos).
  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS', // Asumiendo pesos argentinos, puedes cambiarlo si es necesario
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(price);
  // Esto convertirá 28000 en "$ 28.000"
  // --- FIN DE LA LÓGICA ---

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link href={`/producto/${id}`} className="block group">
        <div className="relative w-full h-80 overflow-hidden rounded-md">
          <Image
            src={imageUrl}
            alt={name}
            fill
            style={{ objectFit: 'cover' }}
            className="group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-md"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="mt-4 text-center">
           {/* Texto blanco para contraste sobre fondo verde */}
          <h3 className="font-serif text-xl text-white group-hover:text-brand-primary transition-colors">{name}</h3>
          {/* --- CAMBIO AQUÍ --- */}
          {/* Usamos la nueva variable 'formattedPrice' en lugar de 'price.toFixed(2)' */}
          <p className="mt-1 text-md font-semibold text-white">{formattedPrice}</p>
        </div>
      </Link>
    </motion.div>
  );
}