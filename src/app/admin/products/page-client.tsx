'use client'

import { useState } from 'react'
import { deleteProduct } from './actions'
import ProductModal from './ProductModal'
import PaginationControls from '../_components/PaginationControls'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

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
  full_image_url: string | null;
};

interface ProductsPageClientProps {
  initialProducts: Product[];
  categories: Category[];
  totalProducts: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  pageSize: number;
  currentSearch: string;
  currentCategory: string;
}

const formattedPrice = (n: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);

export default function ProductsPageClient({
  initialProducts,
  categories,
  totalProducts,
  hasNextPage,
  hasPrevPage,
  pageSize,
  currentSearch,
  currentCategory,
}: ProductsPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState(currentSearch);
  const [categoryFilter, setCategoryFilter] = useState(currentCategory);

  const openModal = (product: Product | null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');
    if (searchTerm) { params.set('search', searchTerm); } else { params.delete('search'); }
    if (categoryFilter) { params.set('category', categoryFilter); } else { params.delete('category'); }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    router.push(pathname);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-secondary">Productos</h1>
          <p className="text-sm text-gray-400 mt-1">{totalProducts} productos en total</p>
        </div>
        <button
          onClick={() => openModal(null)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-primary/90 transition-colors shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"/><path d="M12 5v14"/>
          </svg>
          Nuevo producto
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
            className="flex-1 min-w-48 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-brand-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary bg-white"
          >
            <option value="">Todas las categorías</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <button
            onClick={handleFilter}
            className="px-5 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-primary/90 transition-colors"
          >
            Buscar
          </button>
          {(currentSearch || currentCategory) && (
            <button
              onClick={handleClearFilters}
              className="px-5 py-2.5 bg-gray-100 text-gray-500 text-sm font-semibold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/80">
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Imagen</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Nombre</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Categoría</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Precio</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Stock</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Estado</th>
                <th className="px-5 py-3.5 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {initialProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-gray-400 text-sm">
                    No se encontraron productos.
                  </td>
                </tr>
              ) : (
                initialProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/60 transition-colors group">
                    {/* Image */}
                    <td className="px-5 py-3">
                      <img
                        src={product.full_image_url || '/placeholder.png'}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg border border-gray-100"
                      />
                    </td>

                    {/* Name */}
                    <td className="px-5 py-3">
                      <button
                        onClick={() => openModal(product)}
                        className="font-semibold text-brand-secondary hover:text-brand-primary transition-colors text-left"
                        title="Editar producto"
                      >
                        {product.name}
                      </button>
                      {product.is_featured && (
                        <span className="ml-2 text-xs bg-brand-accent/10 text-brand-accent px-2 py-0.5 rounded-full font-medium">
                          Destacado
                        </span>
                      )}
                    </td>

                    {/* Category */}
                    <td className="px-5 py-3 text-gray-500">{product.category_name}</td>

                    {/* Price */}
                    <td className="px-5 py-3 font-semibold text-brand-secondary">
                      {formattedPrice(product.sale_price)}
                    </td>

                    {/* Stock */}
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        product.stock === 0
                          ? 'bg-red-50 text-red-600'
                          : product.stock <= 3
                          ? 'bg-orange-50 text-orange-600'
                          : 'bg-green-50 text-green-700'
                      }`}>
                        {product.stock}
                      </span>
                    </td>

                    {/* Visibility */}
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                        product.is_visible ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${product.is_visible ? 'bg-green-500' : 'bg-gray-300'}`} />
                        {product.is_visible ? 'Visible' : 'Oculto'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openModal(product)}
                          title="Editar"
                          className="p-2 text-gray-400 hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                          </svg>
                        </button>
                        <form action={deleteProduct} className="inline">
                          <input type="hidden" name="id" value={product.id} />
                          <input type="hidden" name="image_url" value={product.image_url || ''} />
                          <button
                            type="submit"
                            title="Eliminar"
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            onClick={(e) => {
                              if (!confirm(`¿Eliminar "${product.name}"?`)) e.preventDefault();
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                            </svg>
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <PaginationControls
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        totalProducts={totalProducts}
        pageSize={pageSize}
      />

      {isModalOpen && (
        <ProductModal product={editingProduct} categories={categories} onClose={closeModal} />
      )}
    </div>
  );
}
