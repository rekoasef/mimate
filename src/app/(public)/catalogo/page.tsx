// src/app/(public)/catalogo/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import ProductCard from '../_components/ProductCard';
import PaginationControls from '../_components/PaginationControls'; // 1. Importar el componente

function getPublicUrl(path: string | null) {
  if (!path) return '/placeholder.png';
  const supabase = createServerComponentClient({ cookies });
  const { data } = supabase.storage.from('product_images').getPublicUrl(path);
  return data.publicUrl;
}

export default async function CatalogoPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const supabase = createServerComponentClient({ cookies });
  
  // --- LÓGICA DE PAGINACIÓN ---
  const page = searchParams['page'] ? Number(searchParams['page']) : 1;
  const pageSize = 8;
  const offset = (page - 1) * pageSize;
  const selectedCategoryId = searchParams['categoria'] as string | undefined;

  const { data: categories } = await supabase.from('categories').select('id, name');

  // Construimos la consulta base
  let query = supabase
    .from('products')
    .select('id, name, sale_price, image_url, category_id', { count: 'exact' }) // Pedimos el conteo total
    .eq('is_visible', true);

  if (selectedCategoryId) {
    query = query.eq('category_id', selectedCategoryId);
  }

  // Ejecutamos la consulta con el rango de paginación
  const { data: products, count } = await query
    .order('created_at', { ascending: false })
    .range(offset, offset + pageSize - 1);
  
  const totalProducts = count ?? 0;
  const totalPages = Math.ceil(totalProducts / pageSize);

  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;
  // --- FIN DE LA LÓGICA ---

  return (
    <div>
      <h1 className="font-serif text-4xl font-bold text-brand-secondary mb-8 text-center">Nuestro Catálogo</h1>

      <div className="flex justify-center flex-wrap gap-4 mb-10">
        {/* ... (código de los filtros sin cambios) ... */}
        <Link 
          href="/catalogo" 
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${!selectedCategoryId ? 'bg-brand-primary text-white shadow-sm' : 'bg-brand-surface text-brand-text hover:bg-gray-100'}`}
        >
          Todos
        </Link>
        {categories?.map((category) => (
          <Link
            key={category.id}
            href={`/catalogo?categoria=${category.id}`}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${selectedCategoryId === String(category.id) ? 'bg-brand-primary text-white shadow-sm' : 'bg-brand-surface text-brand-text hover:bg-gray-100'}`}
          >
            {category.name}
          </Link>
        ))}
      </div>

      {products && products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.sale_price}
                imageUrl={getPublicUrl(product.image_url)}
              />
            ))}
          </div>
          
          {/* 2. Añadimos los controles de paginación */}
          <PaginationControls hasNextPage={hasNextPage} hasPrevPage={hasPrevPage} />
        </>
      ) : (
        <p className="text-center text-gray-500">No se encontraron productos en esta categoría.</p>
      )}
    </div>
  );
}