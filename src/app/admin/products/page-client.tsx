// src/app/admin/products/page-client.tsx
'use client'

import { useState, useMemo } from 'react'
import { deleteProduct } from './actions'
import ProductModal from './ProductModal'

// Definimos los tipos de datos que la página recibirá como props
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
};

// Icono simple para el estado 'visible'
function VisibilityIcon({ isVisible }: { isVisible: boolean }) {
  return isVisible ? (
    <span className="inline-block h-4 w-4 rounded-full bg-green-500" title="Visible"></span>
  ) : (
    <span className="inline-block h-4 w-4 rounded-full bg-gray-400" title="Oculto"></span>
  );
}

// El componente ahora recibe los datos iniciales como props
export default function ProductsPageClient({ initialProducts, categories }: { initialProducts: Product[], categories: Category[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const openModal = (product: Product | null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  }
  const closeModal = () => setIsModalOpen(false);
  
  // Lógica de filtrado en tiempo real
  const filteredProducts = useMemo(() => {
    return initialProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter ? product.category_id.toString() === categoryFilter : true;
      return matchesSearch && matchesCategory;
    });
  }, [initialProducts, searchTerm, categoryFilter]);

  return (
    <div>
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-secondary">Gestionar Productos</h2>
        <button onClick={() => openModal(null)} className="px-4 py-2 bg-brand-primary text-brand-text-light rounded-md hover:bg-brand-primary/90">
          + Crear Nuevo Producto
        </button>
      </header>

      <div className="mb-4 flex gap-4">
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
      </div>

      <div className="bg-brand-surface rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold">NOMBRE</th>
              <th className="p-4 font-semibold">CATEGORÍA</th>
              <th className="p-4 font-semibold">PRECIO VENTA</th>
              <th className="p-4 font-semibold">STOCK</th>
              <th className="p-4 font-semibold">VISIBLE</th>
              <th className="p-4 font-semibold">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id} className="border-b border-gray-200 hover:bg-brand-bg">
                <td className="p-4 font-semibold">{product.name}</td>
                <td className="p-4">{product.category_name}</td>
                <td className="p-4">${product.sale_price.toFixed(2)}</td>
                <td className="p-4"><span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">{product.stock}</span></td>
                <td className="p-4"><VisibilityIcon isVisible={product.is_visible} /></td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => openModal(product)} title="Editar" className="p-2 hover:bg-gray-200 rounded-md">✏️</button>
                  <form action={deleteProduct}>
                    <input type="hidden" name="id" value={product.id} />
                    <input type="hidden" name="image_url" value={product.image_url} />
                    <button type="submit" title="Eliminar" className="p-2 hover:bg-gray-200 rounded-md">🗑️</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && <ProductModal product={editingProduct} categories={categories} onClose={closeModal} />}
    </div>
  )
}