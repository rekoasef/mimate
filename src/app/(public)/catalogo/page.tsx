// src/app/(public)/catalogo/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import ProductCard from '../_components/ProductCard';

// Función para obtener la URL pública de la imagen
function getPublicUrl(path: string | null) {
  if (!path) return '/placeholder.png'; // Una imagen por defecto si no hay
  const supabase = createServerComponentClient({ cookies });
  const { data } = supabase.storage.from('product_images').getPublicUrl(path);
  return data.publicUrl;
}

export default async function CatalogoPage({ searchParams }: { searchParams: { categoria?: string } }) {
  const supabase = createServerComponentClient({ cookies });
  const selectedCategoryId = searchParams.categoria;

  // 1. Obtenemos todas las categorías para los botones de filtro
  const { data: categories } = await supabase.from('categories').select('id, name');

  // 2. Construimos la consulta de productos dinámicamente
  let query = supabase
    .from('products')
    .select('id, name, price, image_url');

  // Si hay una categoría seleccionada en la URL, añadimos el filtro
  if (selectedCategoryId) {
    query = query.eq('category_id', selectedCategoryId);
  }

  // Ejecutamos la consulta final
  const { data: products } = await query.order('created_at', { ascending: false });

  return (
    <div>
      <h1 className="text-4xl font-bold text-brand-secondary mb-8 text-center">Nuestro Catálogo</h1>

      {/* Filtros de Categoría */}
      <div className="flex justify-center flex-wrap gap-4 mb-10">
        <Link 
          href="/catalogo" 
          className={`px-4 py-2 rounded-full text-sm font-semibold ${!selectedCategoryId ? 'bg-brand-primary text-white' : 'bg-brand-surface text-brand-text'}`}
        >
          Todos
        </Link>
        {categories?.map((category) => (
          <Link
            key={category.id}
            href={`/catalogo?categoria=${category.id}`}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${selectedCategoryId === String(category.id) ? 'bg-brand-primary text-white' : 'bg-brand-surface text-brand-text'}`}
          >
            {category.name}
          </Link>
        ))}
      </div>

      {/* Grilla de Productos */}
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={getPublicUrl(product.image_url)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-brand-text">No se encontraron productos en esta categoría.</p>
      )}
    </div>
  );
}