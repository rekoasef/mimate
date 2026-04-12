'use client'

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  isFeatured?: boolean;
  stock?: number;
}

export default function ProductCard({ id, name, price, imageUrl, isFeatured, stock }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(price);

  const isLowStock = stock !== undefined && stock > 0 && stock <= 3;
  const isOutOfStock = stock !== undefined && stock === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <Link href={`/producto/${id}`} className="group block bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
        {/* Image */}
        <div className="relative w-full aspect-square overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            fill
            style={{ objectFit: 'contain' }}
            className="group-hover:scale-105 transition-transform duration-500 ease-in-out p-2"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {isFeatured && (
              <span className="bg-brand-accent text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                ⭐ Destacado
              </span>
            )}
            {isLowStock && (
              <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md animate-pulse">
                ¡Últim{stock === 1 ? 'o' : 'os'} {stock}!
              </span>
            )}
            {isOutOfStock && (
              <span className="bg-gray-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                Sin stock
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-4 pt-3">
          <h3 className="font-serif text-lg text-white group-hover:text-brand-primary transition-colors leading-snug line-clamp-2">
            {name}
          </h3>
          <p className="mt-1.5 text-xl font-extrabold text-white tracking-tight">
            {formattedPrice}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
