// src/app/(public)/producto/[id]/page.tsx
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';

export const dynamic = 'force-dynamic';

const PHONE = '543471339026';

function getPublicUrl(path: string | null, supabaseUrl: string) {
  if (!path) return '/placeholder.png';
  return `${supabaseUrl}/storage/v1/object/public/product_images/${path}`;
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabase = createServerClient(
    supabaseUrl,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  );

  const { data: product } = await supabase
    .from('products')
    .select(`*, category:categories (name)`)
    .eq('id', params.id)
    .single();

  if (!product) notFound();

  const waMessage = encodeURIComponent(`¡Hola! Me gustaría saber más sobre este producto: ${product.name}`);
  const waUrl = `https://wa.me/${PHONE}?text=${waMessage}`;

  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(product.sale_price);

  const isLowStock = product.stock > 0 && product.stock <= 3;
  const isOutOfStock = product.stock === 0;

  return (
    <div className="py-6 md:py-10">
      {/* Back link */}
      <Link
        href="/catalogo"
        className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm mb-8 group"
      >
        <FiArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Volver al catálogo
      </Link>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-14 items-start">
        {/* Image */}
        <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden bg-white/5 shadow-2xl">
          <Image
            src={getPublicUrl(product.image_url, supabaseUrl)}
            alt={product.name}
            fill
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="p-4"
          />
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.is_featured && (
              <span className="bg-brand-accent text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                ⭐ Destacado
              </span>
            )}
            {isLowStock && (
              <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow animate-pulse">
                ¡Últim{product.stock === 1 ? 'o' : 'os'} {product.stock}!
              </span>
            )}
            {isOutOfStock && (
              <span className="bg-gray-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                Sin stock
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          {product.category?.name && (
            <span className="text-brand-primary font-semibold text-sm mb-2 uppercase tracking-wider">
              {product.category.name}
            </span>
          )}

          <h1 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
            {product.name}
          </h1>

          {product.description && (
            <p className="text-gray-200/80 text-base leading-relaxed mb-6">
              {product.description}
            </p>
          )}

          {/* Price */}
          <div className="mb-2">
            <p className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {formattedPrice}
            </p>
          </div>

          {/* Stock indicator */}
          {!isOutOfStock && product.stock > 0 && (
            <p className={`text-sm font-medium mb-6 ${isLowStock ? 'text-orange-400' : 'text-green-400'}`}>
              {isLowStock
                ? `¡Solo quedan ${product.stock} unidades!`
                : '✓ En stock'}
            </p>
          )}
          {isOutOfStock && (
            <p className="text-sm font-medium text-gray-400 mb-6">Sin stock disponible</p>
          )}

          {/* CTA */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold py-4 px-8 rounded-2xl text-base transition-all hover:scale-[1.02] active:scale-95 shadow-xl w-full sm:w-auto"
          >
            <FaWhatsapp size={22} />
            Consultar por WhatsApp
          </a>

          <p className="mt-3 text-white/40 text-xs text-center sm:text-left">
            Respondemos de inmediato con atención personalizada
          </p>
        </div>
      </div>
    </div>
  );
}
