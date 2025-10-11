// src/app/(public)/page.tsx
import { createServerClient } from '@supabase/ssr'; // Importación actualizada
import { cookies } from 'next/headers';
import Link from 'next/link';
import Image from 'next/image';
import FeaturedCarousel from './_components/FeaturedCarousel';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  ); // Nueva forma de crear el cliente

  const { data: featuredProducts } = await supabase
    .from('products')
    .select('id, name, sale_price, image_url')
    .eq('is_visible', true)
    .eq('is_featured', true)
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-24">
      <section className="bg-brand-bg pt-12">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative w-full aspect-square md:aspect-[3/4] md:h-auto rounded-md overflow-hidden">
            <Image 
              src="/hero-main.jpg"
              alt="Mate de Mimate con estilo minimalista"
              fill
              style={{objectFit: 'cover'}}
              priority
              className="object-cover object-center" 
            />
          </div>
          <div className="text-left py-8 md:py-0">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-brand-secondary leading-tight">
              Un ritual, <br />una pausa, <br />una conexión.
            </h1>
            <p className="mt-6 text-base sm:text-lg max-w-lg text-gray-700">
              En Mimate, creemos que cada mate es un momento para vos. Seleccionamos y creamos los mejores productos con calidad, diseño y la mejor onda.
            </p>
            <Link href="/catalogo" className="mt-8 inline-block bg-brand-primary text-brand-text-light font-bold py-3 px-8 rounded-full text-lg hover:bg-brand-secondary transition-colors">
              Descubrir Colección
            </Link>
          </div>
        </div>
      </section>
      
      <section>
        <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-brand-secondary">Productos Destacados</h2>
            <p className="mt-2 text-gray-500">Una selección especial de nuestros favoritos.</p>
        </div>
        {featuredProducts && featuredProducts.length > 0 ? (
          <FeaturedCarousel products={featuredProducts} />
        ) : (
          <p className="text-center text-gray-500">Pronto tendremos nuevos productos destacados.</p>
        )}
      </section>

      <section className="text-center py-20 my-12 bg-white rounded-md">
         <h2 className="font-serif text-4xl font-bold text-brand-secondary">¿Hablamos?</h2>
        <p className="text-lg mt-4 max-w-2xl mx-auto text-gray-600">
          Para consultas, ventas mayoristas o simplemente para charlar, no dudes en escribirnos. Estaremos encantados de ayudarte.
        </p>
        <a href="mailto:mimatearms@gmail.com" className="mt-8 inline-block font-semibold text-lg text-brand-primary hover:underline">
          mimatearms@gmail.com
        </a>
      </section>
    </div>
  );
}