// src/app/(public)/page.tsx
'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FeaturedCarousel from './_components/FeaturedCarousel'; // Ensure this path is correct
import { motion } from 'framer-motion';

// --- Helper Functions (No changes needed) ---
function getPublicUrl(path: string | null) {
  if (!path) return '/placeholder.png';
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  return `${supabaseUrl}/storage/v1/object/public/product_images/${path}`;
}

type Product = {
  id: number;
  name: string;
  sale_price: number;
  image_url: string | null;
}

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      const { data } = await supabase
        .from('products')
        .select('id, name, sale_price, image_url')
        .eq('is_visible', true)
        .eq('is_featured', true)
        .order('created_at', { ascending: false });
      setFeaturedProducts(data || []);
    };
    fetchFeaturedProducts();
  }, [supabase]);

  // --- Animation Variants (No changes needed here) ---
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
  };
  const heroImageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };
  const heroTextContainerVariants = {
    hidden: {},
    visible: { transition: { delayChildren: 0.5, staggerChildren: 0.07 } }
  };
  const letterVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };
  const otherTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const heroTitle = "Un ritual,\nuna pausa,\nuna conexión.";
  const titleChars = heroTitle.split('');
  const textBlockBaseDelay = 0.5;
  const titleAnimationDuration = titleChars.length * 0.07;
  const preciseDelay = textBlockBaseDelay + titleAnimationDuration;

  return (
    <div className="space-y-24">
      <motion.section
        className="bg-brand-bg pt-12"
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Image Animation */}
          <motion.div
            className="relative w-full aspect-square md:aspect-[3/4] md:h-auto rounded-md overflow-hidden"
            variants={heroImageVariants}
          >
            <Image src="/hero-main.jpg" alt="Mate de Mimate con estilo minimalista" fill style={{ objectFit: 'cover' }} priority className="object-cover object-center" />
          </motion.div>

          {/* Text Block Animation */}
          <motion.div
            className="text-left py-8 md:py-0"
            variants={heroTextContainerVariants}
          >
            {/* Typewriter Title */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-brand-secondary leading-tight whitespace-pre-line">
              {titleChars.map((char, index) => (
                <motion.span key={index} variants={letterVariants}>
                  {char}
                </motion.span>
              ))}
            </h1>

            {/* Paragraph Animation */}
            <motion.p
              className="mt-6 text-base sm:text-lg max-w-lg text-gray-700"
              variants={otherTextVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: preciseDelay }}
            >
              En Mimate, creemos que cada mate es un momento para vos. Seleccionamos y creamos los mejores productos con calidad, diseño y la mejor onda.
            </motion.p>

            {/* --- CORRECTION HERE --- */}
            {/* Button Animation - Changed div to motion.div */}
            <motion.div
              variants={otherTextVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: preciseDelay + 0.1 }} // Slightly after paragraph
            >
              <Link href="/catalogo" className="mt-8 inline-block bg-brand-primary text-brand-text-light font-bold py-3 px-8 rounded-full text-lg hover:bg-brand-secondary transition-colors">
                Descubrir Colección
              </Link>
            </motion.div>
            {/* --- END CORRECTION --- */}

          </motion.div>
        </div>
      </motion.section>

      {/* Featured Products Carousel */}
      <section>
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-brand-secondary">Productos Destacados</h2>
          <p className="mt-2 text-gray-500">Una selección especial de nuestros favoritos.</p>
        </div>
        {featuredProducts && featuredProducts.length > 0 ? (
          <FeaturedCarousel products={featuredProducts} />
        ) : (
          <p className="text-center text-gray-500">Cargando productos destacados...</p>
        )}
      </section>

      {/* Contact Section */}
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