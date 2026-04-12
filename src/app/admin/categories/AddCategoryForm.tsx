'use client'

import { addCategory } from './actions'

export default function AddCategoryForm() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
        Nueva categoría
      </h3>
      <form action={addCategory} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Ej: Imperial, Torpedo, Camionero..."
          required
          className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-brand-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-colors"
        />
        <button
          type="submit"
          className="w-full px-5 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-primary/90 transition-colors"
        >
          Agregar categoría
        </button>
      </form>
    </div>
  )
}
