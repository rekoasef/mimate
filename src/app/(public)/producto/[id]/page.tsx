// src/app/(public)/producto/[id]/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
export const dynamic = 'force-dynamic';

// Función para obtener la URL pública de la imagen
function getPublicUrl(path: string | null) {
  if (!path) return '/placeholder.png'; // Una imagen por defecto si no hay
  const supabase = createServerComponentClient({ cookies });
  const { data } = supabase.storage.from('product_images').getPublicUrl(path);
  return data.publicUrl;
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });

  const { data: product } = await supabase
    .from('products')
    .select(`
      *,
      category:categories (name)
    `)
    .eq('id', params.id)
    .single();

  if (!product) {
    notFound();
  }

  const phoneNumber = 'TU_NUMERO_DE_WHATSAPP'; // Ejemplo: 5493411234567
  const message = encodeURIComponent(`¡Hola! Me gustaría saber más sobre este producto: ${product.name}`);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 py-8">
      {/* Columna de la Imagen - Ajustes para PNG sin fondo */}
      <div className="relative h-96 md:h-[480px] lg:h-[520px] rounded-lg overflow-hidden shadow-lg flex items-center justify-center"> {/* Quitamos bg-white y p-4 aquí */}
        <Image
          src={getPublicUrl(product.image_url)}
          alt={product.name}
          fill
          style={{ objectFit: 'contain' }} // Mantener 'contain' si la imagen real es PNG y queremos que se vea completa
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          className="rounded-md"
        />
      </div>

      {/* Columna de Información - Sombra más prominente */}
      <div className="flex flex-col justify-center bg-brand-bg p-8 rounded-lg shadow-xl"> {/* Cambiado a shadow-xl */}
        <span className="text-sm font-semibold text-brand-primary mb-2 block">{product.category.name}</span>
        <h1 className="font-serif text-4xl lg:text-5xl font-bold text-brand-secondary leading-tight mb-4">{product.name}</h1>
        <p className="mt-2 text-brand-text text-lg leading-relaxed">{product.description}</p>
        
        <div className="my-8 border-t border-b border-gray-300 py-4">
          <p className="text-4xl lg:text-5xl font-extrabold text-brand-secondary">${product.sale_price.toFixed(2)}</p>
        </div>
        
        {/* Botón de WhatsApp */}
        <div>
          <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 w-full sm:w-auto justify-center px-8 py-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-transform hover:scale-105">
            <FaWhatsapp size={24} />
            Consultar por WhatsApp
          </Link>
        </div>
      </div>
    </div>
  );
}