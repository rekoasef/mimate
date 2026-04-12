// src/app/(public)/page.tsx
'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FeaturedCarousel from './_components/FeaturedCarousel';
import { motion, Variants } from 'framer-motion';
import { FaWhatsapp, FaTruck, FaStar, FaShieldAlt } from 'react-icons/fa';

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
};

const PHONE = '543471339026';

const benefits = [
  {
    icon: FaTruck,
    title: 'Envíos a todo el país',
    desc: 'Hacemos llegar tu mate a cualquier rincón de Argentina.',
  },
  {
    icon: FaStar,
    title: 'Calidad artesanal',
    desc: 'Cada producto es seleccionado personalmente con cuidado y detalle.',
  },
  {
    icon: FaShieldAlt,
    title: 'Compra segura',
    desc: 'Atención personalizada y garantía en cada producto.',
  },
];

const testimonials = [
  {
    name: 'Valentina G.',
    text: 'Me llegó el mate en perfectas condiciones, hermoso y de muy buena calidad. ¡Lo recomiendo!',
    stars: 5,
  },
  {
    name: 'Martín R.',
    text: 'Excelente atención, me asesoraron por WhatsApp y encontré exactamente lo que buscaba.',
    stars: 5,
  },
  {
    name: 'Luciana P.',
    text: 'El envío llegó rápido y bien empaquetado. Sin dudas vuelvo a comprar.',
    stars: 5,
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return;

    const supabase = createBrowserClient(url, key);

    const fetchFeaturedProducts = async () => {
      const { data } = await supabase
        .from('products')
        .select('id, name, sale_price, image_url')
        .eq('is_visible', true)
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(8);
      setFeaturedProducts(data || []);
    };
    fetchFeaturedProducts();
  }, []);

  // Hero title animation
  const heroTitle = 'Un ritual,\nuna pausa,\nuna conexión.';
  const titleChars = heroTitle.split('');
  const letterDelay = 0.06;
  const titleDuration = titleChars.length * letterDelay;
  const afterTitleDelay = 0.4 + titleDuration;

  const heroContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };
  const heroImage: Variants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };
  const heroText: Variants = {
    hidden: {},
    visible: { transition: { delayChildren: 0.4, staggerChildren: letterDelay } },
  };
  const letter: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const afterTitle: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: afterTitleDelay, ease: 'easeOut' } },
  };
  const cta: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: afterTitleDelay + 0.15, ease: 'easeOut' } },
  };

  return (
    <div>
      {/* ─── HERO ─── */}
      <motion.section
        className="pt-8 pb-4"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center mb-24">
          <motion.div
            className="relative w-full aspect-square md:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
            variants={heroImage}
          >
            <Image
              src="/mimate4.jpg"
              alt="Mate artesanal de Mimate"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center 65%' }}
              priority
            />
            {/* Subtle gradient overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>

          <motion.div className="text-left py-4 md:py-0" variants={heroText}>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-brand-text-dark-brown text-outline-white leading-tight whitespace-pre-line">
              {titleChars.map((char, i) => (
                <motion.span key={i} variants={letter}>
                  {char}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="mt-6 text-base sm:text-lg max-w-lg text-gray-200 leading-relaxed"
              variants={afterTitle}
              initial="hidden"
              animate="visible"
            >
              En Mimate seleccionamos cada producto personalmente, cuidando cada detalle
              y buscando lo mejor de nuestros artesanos. Porque un buen mate te acompaña
              en cada etapa de la vida.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-3"
              variants={cta}
              initial="hidden"
              animate="visible"
            >
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center bg-brand-accent text-white font-bold py-3.5 px-8 rounded-full text-base hover:bg-opacity-90 transition-all hover:scale-105 shadow-lg"
              >
                Ver catálogo
              </Link>
              <a
                href={`https://wa.me/${PHONE}?text=${encodeURIComponent('¡Hola! Quisiera consultar sobre sus productos.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-3.5 px-8 rounded-full text-base hover:bg-green-600 transition-all hover:scale-105 shadow-lg"
              >
                <FaWhatsapp size={20} />
                Consultar ahora
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="mb-24">
        <motion.div
          className="text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl font-bold text-brand-text-dark-brown text-outline-white">
            Productos Destacados
          </h2>
          <p className="mt-2 text-gray-300 text-base">
            Una selección especial de nuestros favoritos.
          </p>
        </motion.div>

        {featuredProducts.length > 0 ? (
          <FeaturedCarousel products={featuredProducts} />
        ) : (
          <p className="text-center text-gray-400 py-8">Cargando productos destacados...</p>
        )}

        <div className="text-center mt-10">
          <Link
            href="/catalogo"
            className="inline-block border-2 border-white/40 text-white font-semibold py-3 px-8 rounded-full hover:bg-white/10 transition-all text-sm"
          >
            Ver todos los productos →
          </Link>
        </div>
      </section>

      {/* ─── BENEFITS ─── */}
      <motion.section
        className="mb-24"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2
          variants={fadeUp}
          className="font-serif text-3xl font-bold text-brand-text-dark-brown text-outline-white text-center mb-10"
        >
          ¿Por qué elegirnos?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b) => (
            <motion.div
              key={b.title}
              variants={fadeUp}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-7 text-center border border-white/10 hover:bg-white/15 transition-colors"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-brand-primary/30 rounded-full p-4">
                  <b.icon size={28} className="text-white" />
                </div>
              </div>
              <h3 className="font-bold text-white text-lg mb-2">{b.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ─── TESTIMONIALS ─── */}
      <motion.section
        className="mb-24"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2
          variants={fadeUp}
          className="font-serif text-3xl font-bold text-brand-text-dark-brown text-outline-white text-center mb-10"
        >
          Lo que dicen nuestros clientes
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <FaStar key={i} size={14} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-white/80 text-sm leading-relaxed italic mb-4">
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="text-white font-bold text-sm">{t.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ─── WHATSAPP CTA ─── */}
      <motion.section
        className="text-center py-16 mb-12 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="font-serif text-4xl font-bold text-brand-text-dark-brown text-outline-white mb-4">
          ¿Hablamos?
        </h2>
        <p className="text-lg text-gray-200 max-w-xl mx-auto mb-8 leading-relaxed">
          Para consultas, ventas o simplemente para charlar sobre mates, escribinos.
          Respondemos rápido y con atención personalizada.
        </p>
        <a
          href={`https://wa.me/${PHONE}?text=${encodeURIComponent('¡Hola! Quisiera consultar sobre sus productos.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-full text-lg transition-all hover:scale-105 shadow-xl"
        >
          <FaWhatsapp size={24} />
          Escribinos por WhatsApp
        </a>
        <p className="mt-4 text-white/40 text-sm">
          También podés escribirnos a{' '}
          <a href="mailto:mimatearms@gmail.com" className="underline hover:text-white/70 transition-colors">
            mimatearms@gmail.com
          </a>
        </p>
      </motion.section>
    </div>
  );
}
