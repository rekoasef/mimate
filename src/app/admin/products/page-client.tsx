// src/app/admin/products/page-client.tsx
'use client' 

import { useState } from 'react'
import { deleteProduct } from './actions'
import ProductModal from './ProductModal'
import PaginationControls from '../_components/PaginationControls'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

// 1. Actualizamos el tipo Product para incluir la URL completa
type Category = { id: number; name: string };
type Product = { 
  id: number; 
  name: string; 
  sale_price: number; 
  stock: number; 
  is_visible: boolean; 
  image_url: string | null; 
  category_name: string; 
  description: string | null; 
  cost_price: number; 
  category_id: number; 
  is_featured: boolean; 
  full_image_url: string | null; // <-- ¡Confirmamos que está aquí!
};
interface ProductsPageClientProps {
  initialProducts: Product[],
  categories: Category[],
  totalProducts: number,
  hasNextPage: boolean,
  hasPrevPage: boolean,
  pageSize: number,
  currentSearch: string,
  currentCategory: string,
}

function VisibilityIcon({ isVisible }: { isVisible: boolean }) {
  // ... (código sin cambios)
  return isVisible ? (
    <span className="inline-block h-4 w-4 rounded-full bg-green-500" title="Visible"></span>
  ) : (
    <span className="inline-block h-4 w-4 rounded-full bg-gray-400" title="Oculto"></span>
  );
}

export default function ProductsPageClient({ 
  initialProducts, 
  categories, 
  totalProducts, 
  hasNextPage, 
  hasPrevPage,
  pageSize,
  currentSearch,
  currentCategory
}: ProductsPageClientProps) {
  
  // ... (código de estado y funciones sin cambios)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState(currentSearch);
  const [categoryFilter, setCategoryFilter] = useState(currentCategory);

  const openModal = (product: Product | null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  }
  const closeModal = () => setIsModalOpen(false);
  
  const handleFilter = () => {
    // ... (código sin cambios)
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', '1')
    if (searchTerm) {
      params.set('search', searchTerm)
    } else {
      params.delete('search')
    }
    if (categoryFilter) {
      params.set('category', categoryFilter)
    } else {
      params.delete('category')
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleClearFilters = () => {
    // ... (código sin cambios)
    setSearchTerm('')
    setCategoryFilter('')
    router.push(pathname)
  }

  return (
    <div>
      {/* ... (código del header y filtros sin cambios) ... */}
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-secondary">Gestionar Productos</h2>
        <button onClick={() => openModal(null)} className="px-4 py-2 bg-brand-primary text-brand-text-light rounded-md hover:bg-brand-primary/90">
          + Crear Nuevo Producto
        </button>
      </header>
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-md text-brand-text"
        />
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="p-2 border border-gray-300 rounded-md text-brand-text">
          <option value="">Todas las categorías</option>
          {categories?.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
        </select>
        <button onClick={handleFilter} className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Buscar
        </button>
        <button onClick={handleClearFilters} className="px-4 py-2 bg-gray-300 text-brand-text rounded-md">
          Limpiar
        </button>
      </div>

      <div className="bg-brand-surface rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold">IMAGEN</th>
              <th className="p-4 font-semibold">NOMBRE</th>
              <th className="p-4 font-semibold">CATEGORÍA</th>
              <th className="p-4 font-semibold">PRECIO VENTA</th>
              <th className="p-4 font-semibold">STOCK</th>
              <th className="p-4 font-semibold">VISIBLE</th>
              <th className="p-4 font-semibold">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {initialProducts.map(product => (
              <tr key={product.id} className="border-b border-gray-200 hover:bg-brand-bg">
                <td className="p-2">
                  <img 
                    src={product.full_image_url || '/placeholder.png'} 
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                {/* --- ¡CAMBIO AQUÍ! --- */}
                <td className="p-4 font-semibold">
                  <button 
                    onClick={() => openModal(product)} 
                    className="text-left text-brand-secondary hover:text-brand-primary hover:underline"
                    title="Ver/Editar Producto"
                  >
                    {product.name}
                  </button>
                </td>
                {/* --- FIN DEL CAMBIO --- */}
                <td className="p-4">{product.category_name}</td>
                <td className="p-4">${product.sale_price.toFixed(2)}</td>
                <td className="p-4"><span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">{product.stock}</span></td>
                <td className="p-4"><VisibilityIcon isVisible={product.is_visible} /></td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => openModal(product)} title="Editar" className="p-2 hover:bg-gray-200 rounded-md">✏️</button>
                  <form action={deleteProduct}>
                    <input type="hidden" name="id" value={product.id} />
                    <input type="hidden" name="image_url" value={product.image_url || ''} />
                    <button type="submit" title="Eliminar" className="p-2 hover:bg-gray-200 rounded-md">🗑️</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PaginationControls 
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        totalProducts={totalProducts}
        pageSize={pageSize}
      />
      {isModalOpen && <ProductModal product={editingProduct} categories={categories} onClose={closeModal} />}
    </div>
  )
}