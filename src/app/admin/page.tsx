// src/app/admin/page.tsx
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import StatCard from './_components/StatCard';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const ProductsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
    <path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);
const CategoryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
  </svg>
);
const StockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
    <path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>
  </svg>
);

export default async function AdminDashboard() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  );

  const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
  const { count: categoryCount } = await supabase.from('categories').select('*', { count: 'exact', head: true });
  const { data: stockData } = await supabase.from('products').select('stock');

  const totalStock = stockData?.reduce((acc, p) => acc + (p.stock || 0), 0) || 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-brand-secondary">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">Resumen general del catálogo</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <StatCard title="Productos totales" value={productCount ?? 0} icon={<ProductsIcon />} color="green" />
        <StatCard title="Categorías" value={categoryCount ?? 0} icon={<CategoryIcon />} color="brown" />
        <StatCard title="Unidades en stock" value={totalStock} icon={<StockIcon />} color="blue" />
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Acciones rápidas</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/products" className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-primary/90 transition-colors">
            <ProductsIcon />
            Gestionar productos
          </Link>
          <Link href="/admin/categories" className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-secondary text-white text-sm font-semibold rounded-xl hover:bg-brand-secondary/90 transition-colors">
            <CategoryIcon />
            Gestionar categorías
          </Link>
        </div>
      </div>

      {/* Placeholder analytics */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Análisis de ventas</h2>
        <div className="h-32 flex items-center justify-center rounded-xl bg-gray-50 border border-dashed border-gray-200">
          <p className="text-sm text-gray-300">Próximamente: gráficos de KPIs</p>
        </div>
      </div>
    </div>
  );
}
