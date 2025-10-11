// src/app/(public)/catalogo/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import ProductCard from '../_components/ProductCard';
import PaginationControls from '../_components/PaginationControls';

function getPublicUrl(path: string | null) {
  if (!path) return '/placeholder.png';
  const supabase = createServerComponentClient({ cookies });
  const { data } = supabase.storage.from('product_images').getPublicUrl(path);
  return data.publicUrl;
}

export default async function CatalogoPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const supabase = createServerComponentClient({ cookies });
  
  const page = searchParams['page'] ? Number(searchParams['page']) : 1;
  const pageSize = 8;
  const offset = (page - 1) * pageSize;

  // Consulta simplificada sin filtros de categoría
  const { data: products, count } = await supabase
    .from('products')
    .select('id, name, sale_price, image_url', { count: 'exact' })
    .eq('is_visible', true)
    .order('created_at', { ascending: false })
    .range(offset, offset + pageSize - 1);
  
  const totalProducts = count ?? 0;
  const totalPages = Math.ceil(totalProducts / pageSize);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return (
    <div>
      <h1 className="font-serif text-4xl font-bold text-brand-secondary mb-12 text-center">Nuestro Catálogo</h1>

      {/* La barra de filtros ha sido eliminada */}

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
        <p className="text-center text-gray-500">No se encontraron productos.</p>
      )}
    </div>
  );
}