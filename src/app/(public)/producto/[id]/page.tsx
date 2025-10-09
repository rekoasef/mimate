// src/app/(public)/producto/[id]/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa'; // 1. Importamos el icono

// ... (función getPublicUrl sin cambios)
function getPublicUrl(path: string | null) {
  if (!path) return '/placeholder.png';
  const supabase = createServerComponentClient({ cookies });
  const { data } = supabase.storage.from('product_images').getPublicUrl(path);
  return data.publicUrl;
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });

  const { data: product } = await supabase.from('products').select(`*, category:categories (name)`).eq('id', params.id).single();

  if (!product) {
    notFound();
  }

  const phoneNumber = '543471339026'; // Reemplaza con tu número
  const message = encodeURIComponent(`¡Hola! Me gustaría saber más sobre este producto: ${product.name}`);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      {/* Columna de la Imagen (sin cambios) */}
      <div className="relative h-96 md:h-full rounded-lg overflow-hidden shadow-lg">
        <Image src={getPublicUrl(product.image_url)} alt={product.name} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" priority />
      </div>

      {/* Columna de Información */}
      <div className="flex flex-col justify-center">
        <span className="text-sm font-semibold text-brand-primary">{product.category.name}</span>
        <h1 className="font-serif text-4xl font-bold mt-2 text-brand-secondary">{product.name}</h1>
        <p className="mt-4 text-brand-text text-lg">{product.description}</p>
        <p className="text-3xl font-extrabold mt-6 text-brand-primary">${product.sale_price.toFixed(2)}</p>
        
        <div className="mt-8">
          <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 w-full sm:w-auto justify-center px-8 py-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-transform hover:scale-105">
            {/* 2. Usamos el componente del icono */}
            <FaWhatsapp size={24} />
            Consultar por WhatsApp
          </Link>
        </div>
      </div>
    </div>
  );
}