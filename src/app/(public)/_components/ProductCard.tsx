// src/app/(public)/_components/ProductCard.tsx
'use client'

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export default function ProductCard({ id, name, price, imageUrl }: ProductCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link href={`/producto/${id}`} className="block group">
        {/* REMOVED bg-gray-100 */}
        <div className="relative w-full h-80 overflow-hidden rounded-md">
          <Image
            src={imageUrl}
            alt={name}
            fill
            style={{ objectFit: 'cover' }}
            className="group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-md" // Added rounded-md here too
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="mt-4 text-center">
           {/* Ensure text color contrasts with the new background */}
          <h3 className="font-serif text-xl text-white group-hover:text-brand-primary transition-colors">{name}</h3>
          <p className="mt-1 text-md font-semibold text-white">${price.toFixed(2)}</p>
        </div>
      </Link>
    </motion.div>
  );
}