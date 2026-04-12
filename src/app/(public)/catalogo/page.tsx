// src/app/(public)/catalogo/page.tsx
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import ProductCard from '../_components/ProductCard';
import PaginationControls from '../_components/PaginationControls';
import CatalogFilters from '../_components/CatalogFilters';
import SearchBar from '../_components/SearchBar';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Catálogo | Mimate',
  description: 'Explorá nuestra colección completa de mates artesanales. Encontrá el mate perfecto para vos.',
};

function getPublicUrl(path: string | null, supabaseUrl: string) {
  if (!path) return '/placeholder.png';
  return `${supabaseUrl}/storage/v1/object/public/product_images/${path}`;
}

type SearchParams = { [key: string]: string | string[] | undefined };

function str(val: string | string[] | undefined): string {
  return typeof val === 'string' ? val : '';
}

export default async function CatalogoPage({ searchParams }: { searchParams: SearchParams }) {
  const cookieStore = cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabase = createServerClient(
    supabaseUrl,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  );

  // --- Parse params ---
  const page = Math.max(1, Number(str(searchParams['page']) || '1'));
  const pageSize = 9; // 3 columns × 3 rows looks great
  const offset = (page - 1) * pageSize;

  const selectedCategoryId = str(searchParams['categoria']);
  const searchQuery = str(searchParams['q']);
  const minPrice = str(searchParams['min_price']);
  const maxPrice = str(searchParams['max_price']);
  const sortParam = str(searchParams['sort']);
  const onlyFeatured = searchParams['destacados'] === '1';

  // --- Fetch categories ---
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name')
    .order('name');

  // --- Build product query ---
  let query = supabase
    .from('products')
    .select('id, name, sale_price, image_url, is_featured, stock', { count: 'exact' })
    .eq('is_visible', true);

  if (selectedCategoryId) {
    query = query.eq('category_id', selectedCategoryId);
  }
  if (searchQuery) {
    query = query.ilike('name', `%${searchQuery}%`);
  }
  if (minPrice) {
    query = query.gte('sale_price', Number(minPrice));
  }
  if (maxPrice) {
    query = query.lte('sale_price', Number(maxPrice));
  }
  if (onlyFeatured) {
    query = query.eq('is_featured', true);
  }

  // --- Sort ---
  if (sortParam === 'price_asc') {
    query = query.order('sale_price', { ascending: true });
  } else if (sortParam === 'price_desc') {
    query = query.order('sale_price', { ascending: false });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  const { data: products, count } = await query.range(offset, offset + pageSize - 1);

  const totalProducts = count ?? 0;
  const totalPages = Math.ceil(totalProducts / pageSize);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return (
    <div className="py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-text-dark-brown text-outline-white mb-3">
          Nuestro Catálogo
        </h1>
        <p className="text-white/70 text-base">
          Encontrá el mate perfecto para vos
        </p>
      </div>

      {/* Search bar */}
      <div className="mb-8 max-w-xl mx-auto">
        <Suspense fallback={null}>
          <SearchBar initialValue={searchQuery} />
        </Suspense>
      </div>

      {/* Filters + Grid */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

        {/* Filters: desktop sidebar + mobile drawer */}
        <Suspense fallback={null}>
          <CatalogFilters categories={categories ?? []} />
        </Suspense>

        {/* Main content */}
        <div className="flex-1 min-w-0 w-full">

          {/* Result count */}
          <p className="text-white/60 text-sm mb-5">
            {totalProducts === 0
              ? 'No se encontraron productos'
              : `${totalProducts} producto${totalProducts !== 1 ? 's' : ''} encontrado${totalProducts !== 1 ? 's' : ''}`}
          </p>

          {products && products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.sale_price}
                    imageUrl={getPublicUrl(product.image_url, supabaseUrl)}
                    isFeatured={product.is_featured}
                    stock={product.stock}
                  />
                ))}
              </div>

              <Suspense fallback={null}>
                <PaginationControls
                  hasNextPage={hasNextPage}
                  hasPrevPage={hasPrevPage}
                  currentPage={page}
                />
              </Suspense>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-white/60 text-lg">No se encontraron productos.</p>
              <p className="text-white/40 text-sm mt-2">Probá ajustando los filtros o la búsqueda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
