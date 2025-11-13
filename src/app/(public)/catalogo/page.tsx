// src/app/(public)/catalogo/page.tsx
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import ProductCard from '../_components/ProductCard';
import PaginationControls from '../_components/PaginationControls';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

function getPublicUrl(path: string | null) {
  if (!path) return '/placeholder.png';
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  );
  const { data } = supabase.storage.from('product_images').getPublicUrl(path);
  return data.publicUrl;
}

export default async function CatalogoPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  );
  
  // 1. Leemos los parámetros de la URL
  const page = Number(searchParams['page'] ?? '1');
  const pageSize = 8;
  const offset = (page - 1) * pageSize;
  const selectedCategoryId = searchParams['categoria'] as string | undefined;

  // 2. Obtenemos la lista de categorías para los botones de filtro
  const { data: categories } = await supabase.from('categories').select('id, name');

  // 3. Construimos la consulta de productos dinámicamente
  let query = supabase
    .from('products')
    .select('id, name, sale_price, image_url', { count: 'exact' })
    .eq('is_visible', true);

  // ¡Añadimos el filtro de categoría si está seleccionado!
  if (selectedCategoryId) {
    query = query.eq('category_id', selectedCategoryId);
  }

  // 4. Ejecutamos la consulta final con el orden y la paginación
  const { data: products, count } = await query
    .order('created_at', { ascending: false })
    .range(offset, offset + pageSize - 1);
  
  const totalProducts = count ?? 0;
  const totalPages = Math.ceil(totalProducts / pageSize);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  // 5. Función para crear URLs de filtro (mantiene la paginación si existe)
  const createFilterURL = (categoryId?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1'); // Reiniciamos a la pág 1 al cambiar de filtro
    if (categoryId) {
      params.set('categoria', categoryId);
    } else {
      params.delete('categoria');
    }
    return `/catalogo?${params.toString()}`;
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="font-serif text-4xl font-bold text-brand-text-dark-brown text-outline-white mb-12 text-center">Nuestro Catálogo</h1>

      {/* 6. Reactivamos la barra de filtros */}
      <div className="flex justify-center flex-wrap gap-4 mb-10">
        <Link 
          href={createFilterURL()}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${!selectedCategoryId ? 'bg-brand-primary text-white shadow-sm' : 'bg-brand-surface text-brand-text hover:bg-gray-100'}`}
        >
          Todos
        </Link>
        {categories?.map((category) => (
          <Link
            key={category.id}
            href={createFilterURL(category.id.toString())}
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
          
          <PaginationControls hasNextPage={hasNextPage} hasPrevPage={hasPrevPage} />
        </>
      ) : (
        <p className="text-center text-white/80">No se encontraron productos.</p> 
      )}
    </div>
  );
}