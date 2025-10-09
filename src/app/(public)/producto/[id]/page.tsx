// src/app/(public)/producto/[id]/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Image from 'next/image';

// Función para obtener la URL pública de la imagen
function getPublicUrl(path: string | null) {
  if (!path) return '/placeholder.png'; // Imagen por defecto
  const supabase = createServerComponentClient({ cookies });
  const { data } = supabase.storage.from('product_images').getPublicUrl(path);
  return data.publicUrl;
}

// Esta es la función que renderiza la página
export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });

  // Buscamos un único producto cuyo id coincida con el de la URL
  const { data: product } = await supabase
    .from('products')
    .select(`
      *,
      category:categories (name)
    `)
    .eq('id', params.id)
    .single(); // .single() nos devuelve un solo objeto en lugar de un array

  // Si no se encuentra ningún producto, mostramos la página 404
  if (!product) {
    notFound();
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      {/* Columna de la Imagen */}
      <div className="relative h-96 md:h-full rounded-lg overflow-hidden">
        <Image
          src={getPublicUrl(product.image_url)}
          alt={product.name}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Columna de Información */}
      <div className="flex flex-col justify-center">
        <span className="text-sm font-semibold text-brand-primary">{product.category.name}</span>
        <h1 className="text-4xl font-bold mt-2 text-brand-secondary">{product.name}</h1>
        <p className="mt-4 text-brand-text text-lg">{product.description}</p>
        <p className="text-3xl font-extrabold mt-6 text-brand-primary">${product.price.toFixed(2)}</p>
        {/* Aquí podrían ir botones como "Añadir al carrito" en el futuro */}
      </div>
    </div>
  );
}