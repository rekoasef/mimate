// src/app/admin/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import StatCard from './_components/StatCard';
export const dynamic = 'force-dynamic';

// Íconos SVG para las tarjetas
const ProductsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>;
const CategoryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V2h6"/><path d="m12.5 10.5 7.5 7.5"/><path d="m21 12-2-2"/></svg>;
const StockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>;


export default async function AdminDashboard() {
  const supabase = createServerComponentClient({ cookies });

  // Peticiones para obtener las estadísticas
  const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
  const { count: categoryCount } = await supabase.from('categories').select('*', { count: 'exact', head: true });
  const { data: stockData } = await supabase.from('products').select('stock');
  
  const totalStock = stockData?.reduce((acc, product) => acc + product.stock, 0) || 0;

  return (
    <div>
      <h2 className="text-2xl font-bold text-brand-secondary mb-6">Dashboard</h2>
      
      {/* Grid de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Productos Totales" value={productCount || 0} icon={<ProductsIcon />} />
        <StatCard title="Categorías Totales" value={categoryCount || 0} icon={<CategoryIcon />} />
        <StatCard title="Stock Total de Unidades" value={totalStock} icon={<StockIcon />} />
      </div>

      {/* Placeholder para Futuros Gráficos */}
      <div className="mt-12 p-6 bg-brand-surface rounded-lg shadow">
        <h3 className="font-semibold text-brand-secondary">Análisis de Ventas</h3>
        <div className="mt-4 text-center text-gray-400">
          <p>(Aquí irán los gráficos de KPIs en el futuro)</p>
          
        </div>
      </div>
    </div>
  );
}