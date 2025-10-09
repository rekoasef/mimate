// src/app/(public)/_components/ProductCard.tsx
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export default function ProductCard({ id, name, price, imageUrl }: ProductCardProps) {
  return (
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
  );
}