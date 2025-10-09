// src/app/admin/products/ProductModal.tsx
'use client'

import { useEffect, useRef } from 'react'
import { upsertProduct } from './actions'

// Definimos los tipos para los props del componente
type Category = { id: number; name: string };
type Product = { id: number; name: string; description: string | null; sale_price: number; cost_price: number; stock: number; category_id: number; is_featured: boolean; is_visible: boolean; image_url: string | null; };

export default function ProductModal({ product, categories, onClose }: { product: Product | null, categories: Category[], onClose: () => void }) {
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    // Cierra la modal si se presiona la tecla Escape
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleFormAction = async (formData: FormData) => {
    const result = await upsertProduct(formData);
    if (result?.error) {
      alert(result.error); // Muestra un error simple si la acción falla
    } else {
      formRef.current?.reset();
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl text-black max-h-full overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{product ? 'Editar Producto' : 'Crear Nuevo Producto'}</h2>
        <form ref={formRef} action={handleFormAction} className="space-y-4">
          {/* Campo oculto para el ID en modo edición */}
          {product && <input type="hidden" name="id" value={product.id} />}
          {product && <input type="hidden" name="current_image_url" value={product.image_url || ''} />}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" placeholder="Nombre" defaultValue={product?.name} required className="p-2 border rounded" />
            <select name="category_id" defaultValue={product?.category_id} required className="p-2 border rounded">
              <option value="">Selecciona una categoría</option>
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
            <input name="sale_price" type="number" step="0.01" placeholder="Precio Venta" defaultValue={product?.sale_price} required className="p-2 border rounded" />
            <input name="cost_price" type="number" step="0.01" placeholder="Precio Costo" defaultValue={product?.cost_price} required className="p-2 border rounded" />
            <input name="stock" type="number" placeholder="Stock" defaultValue={product?.stock} required className="p-2 border rounded" />
          </div>
          <textarea name="description" placeholder="Descripción" defaultValue={product?.description || ''} className="w-full p-2 border rounded"></textarea>
          <div>
            <label className="block text-sm font-medium text-gray-700">Imagen del producto</label>
            <input name="image" type="file" accept="image/*" className="w-full text-sm" />
            {product?.image_url && <span className="text-xs text-gray-500">Dejar vacío para conservar la imagen actual.</span>}
          </div>
          <div className="flex items-center gap-8">
            <label className="flex items-center gap-2"><input type="checkbox" name="is_featured" defaultChecked={product?.is_featured} /> Destacado</label>
            <label className="flex items-center gap-2"><input type="checkbox" name="is_visible" defaultChecked={product?.is_visible} /> Visible</label>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-brand-primary text-white rounded">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  )
}