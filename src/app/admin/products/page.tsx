// src/app/admin/products/page.tsx
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import ProductsPageClient from './page-client' // Importamos nuestro componente de cliente

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 10; 

export default async function ProductsPage({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  );
  
  const page = Number(searchParams['page'] ?? '1');
  const search = (searchParams['search'] as string) || '';
  const category = (searchParams['category'] as string) || '';

  const offset = (page - 1) * PAGE_SIZE;

  const { data: categories } = await supabase.from('categories').select('id, name');

  let query = supabase
    .from('products')
    .select('*, category:categories (name)', { count: 'exact' });

  if (search) {
    query = query.ilike('name', `%${search}%`);
  }
  if (category) {
    query = query.eq('category_id', category);
  }

  const { data: productsData, count } = await query
    .order('created_at', { ascending: false })
    .range(offset, offset + PAGE_SIZE - 1);
  
  const totalProducts = count ?? 0;
  const totalPages = Math.ceil(totalProducts / PAGE_SIZE);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;
  
  // --- ¡NUEVA LÓGICA AQUÍ! ---
  // Función para obtener la URL pública de la imagen
  const getPublicUrl = (path: string | null) => {
    if (!path) return null;
    const { data } = supabase.storage.from('product_images').getPublicUrl(path);
    return data.publicUrl;
  };

  const products = productsData?.map(p => ({
    ...p,
    category_name: p.category?.name || 'Sin categoría',
    // Creamos un nuevo campo con la URL completa de la imagen
    full_image_url: getPublicUrl(p.image_url) 
  })) || [];

  return (
    <ProductsPageClient 
      initialProducts={products} // Pasamos los productos con la URL de imagen completa
      categories={categories || []}
      totalProducts={totalProducts}
      hasNextPage={hasNextPage}
      hasPrevPage={hasPrevPage}
      pageSize={PAGE_SIZE}
      currentSearch={search}
      currentCategory={category}
    />
  );
}