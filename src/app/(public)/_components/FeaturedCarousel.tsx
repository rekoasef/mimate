// src/app/(public)/_components/FeaturedCarousel.tsx
'use client'

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import ProductCard from './ProductCard'

// Definimos el tipo para los productos que recibirá el carrusel
type Product = {
  id: number;
  name: string;
  sale_price: number;
  image_url: string | null;
}

// Definimos la función para obtener la URL pública (necesaria en el cliente)
function getPublicUrl(path: string | null, supabaseUrl: string) {
  if (!path) return '/placeholder.png';
  return `${supabaseUrl}/storage/v1/object/public/product_images/${path}`;
}

export default function FeaturedCarousel({ products }: { products: Product[] }) {
  // Obtenemos la URL de Supabase de las variables de entorno para usarla en el cliente
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

  // Usamos el hook del carrusel con el plugin de Autoplay
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {products.map((product) => (
          <div className="embla__slide md:basis-1/2 lg:basis-1/3" key={product.id}>
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.sale_price}
              imageUrl={getPublicUrl(product.image_url, supabaseUrl)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}