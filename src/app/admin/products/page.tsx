// src/app/admin/products/page.tsx
import { createServerClient } from '@supabase/ssr' // Importación actualizada
import { cookies } from 'next/headers'
import ProductsPageClient from './page-client' 

export const dynamic = 'force-dynamic';

// Este es un Server Component que se ejecuta primero y obtiene los datos.
export default async function ProductsPage() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  ) // Nueva forma de crear el cliente
  
  // Hacemos las dos peticiones de datos al mismo tiempo para más eficiencia
  const [productsResponse, categoriesResponse] = await Promise.all([
    supabase.from('products').select(`*, category:categories (name)`).order('created_at', { ascending: false }),
    supabase.from('categories').select('id, name')
  ]);
  
  const productsData = productsResponse.data;
  const categories = categoriesResponse.data;

  // Aplanamos y preparamos los datos de productos
  const products = productsData?.map(p => ({
    ...p,
    category_name: p.category?.name || 'Sin categoría'
  })) || [];

  // Finalmente, renderizamos el componente de cliente y le pasamos
  // los datos que obtuvimos en el servidor como props.
  return <ProductsPageClient initialProducts={products} categories={categories || []} />;
}