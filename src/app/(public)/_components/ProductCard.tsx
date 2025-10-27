// src/app/(public)/_components/ProductCard.tsx
'use client' // ¡Importante! Las animaciones necesitan ejecutarse en el cliente

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion'; // 1. Importar motion

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export default function ProductCard({ id, name, price, imageUrl }: ProductCardProps) {
  
  // Definimos las variantes de la animación
  const cardVariants = {
    hidden: { opacity: 0, y: 20 }, // Estado inicial: invisible y ligeramente desplazado hacia abajo
    visible: { opacity: 1, y: 0 }  // Estado final: visible y en su posición original
  };

  return (
    // 2. Envolvemos todo con motion.div y aplicamos las variantes
    <motion.div
      variants={cardVariants}
      initial="hidden" // Empieza oculto
      whileInView="visible" // Anima a 'visible' cuando entra en la pantalla
      viewport={{ once: true, amount: 0.2 }} // La animación solo ocurre una vez, cuando el 20% de la tarjeta es visible
      transition={{ duration: 0.5, ease: "easeOut" }} // Duración y tipo de animación
    >
      <Link href={`/producto/${id}`} className="block group">
        <div className="relative w-full h-80 overflow-hidden rounded-md bg-gray-100">
          <Image
            src={imageUrl}
            alt={name}
            fill
            style={{ objectFit: 'cover' }}
            className="group-hover:scale-105 transition-transform duration-500 ease-in-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="mt-4 text-center">
          <h3 className="font-serif text-xl text-brand-secondary group-hover:text-brand-primary transition-colors">{name}</h3>
          <p className="mt-1 text-md font-semibold text-brand-text">${price.toFixed(2)}</p>
        </div>
      </Link>
    </motion.div>
  );
}