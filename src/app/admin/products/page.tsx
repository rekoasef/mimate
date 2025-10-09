// src/app/admin/products/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import ProductsPageClient from './page-client' // Importamos nuestro componente de cliente

// Este es un Server Component que se ejecuta primero y obtiene los datos.
export default async function ProductsPage() {
  const supabase = createServerComponentClient({ cookies });
  
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