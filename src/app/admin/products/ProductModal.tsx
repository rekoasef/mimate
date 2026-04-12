'use client'

import { useEffect, useRef } from 'react'
import { upsertProduct } from './actions'

type Category = { id: number; name: string };
type Product = {
  id: number;
  name: string;
  description: string | null;
  sale_price: number;
  cost_price: number;
  stock: number;
  category_id: number;
  is_featured: boolean;
  is_visible: boolean;
  image_url: string | null;
};

export default function ProductModal({
  product,
  categories,
  onClose,
}: {
  product: Product | null;
  categories: Category[];
  onClose: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleFormAction = async (formData: FormData) => {
    const result = await upsertProduct(formData);
    if (result?.error) {
      alert(result.error);
    } else {
      formRef.current?.reset();
      onClose();
    }
  };

  const inputClass = 'w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-brand-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-colors';
  const labelClass = 'block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <h2 className="text-lg font-bold text-brand-secondary">
            {product ? 'Editar producto' : 'Nuevo producto'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>

        {/* Form */}
        <form ref={formRef} action={handleFormAction} className="p-6 space-y-6">
          {product && <input type="hidden" name="id" value={product.id} />}
          {product && <input type="hidden" name="current_image_url" value={product.image_url || ''} />}

          {/* Basic info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={labelClass}>Nombre del producto</label>
              <input name="name" placeholder="Ej: Mate Imperial Premium" defaultValue={product?.name} required className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Categoría</label>
              <select name="category_id" defaultValue={product?.category_id || ''} className={inputClass + ' bg-white appearance-none'}>
                <option value="">Sin categoría</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Stock</label>
              <input name="stock" type="number" placeholder="0" defaultValue={product?.stock} required className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Precio de venta</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input name="sale_price" type="number" step="0.01" placeholder="0.00" defaultValue={product?.sale_price} required className={inputClass + ' pl-7'} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Precio de costo</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input name="cost_price" type="number" step="0.01" placeholder="0.00" defaultValue={product?.cost_price} required className={inputClass + ' pl-7'} />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Descripción</label>
            <textarea
              name="description"
              placeholder="Describí el producto..."
              defaultValue={product?.description || ''}
              rows={3}
              className={inputClass + ' resize-none'}
            />
          </div>

          {/* Image */}
          <div>
            <label className={labelClass}>Imagen del producto</label>
            <input
              name="image"
              type="file"
              accept="image/*"
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20 cursor-pointer"
            />
            {product?.image_url && (
              <div className="mt-2 flex items-center gap-4">
                <span className="text-xs text-gray-400">Dejá vacío para conservar la imagen actual.</span>
                <label className="flex items-center gap-1.5 text-xs text-red-500 cursor-pointer">
                  <input type="checkbox" name="delete_image" className="rounded" />
                  Eliminar imagen actual
                </label>
              </div>
            )}
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-6 pt-1">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                name="is_featured"
                defaultChecked={product?.is_featured}
                className="w-4 h-4 rounded accent-brand-primary"
              />
              <span className="text-sm font-medium text-brand-text">Destacado</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                name="is_visible"
                defaultChecked={product?.is_visible}
                className="w-4 h-4 rounded accent-brand-primary"
              />
              <span className="text-sm font-medium text-brand-text">Visible en el catálogo</span>
            </label>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-semibold text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-brand-primary hover:bg-brand-primary/90 rounded-xl transition-colors shadow-sm"
            >
              {product ? 'Guardar cambios' : 'Crear producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
