// src/app/admin/categories/AddCategoryForm.tsx
'use client'

import { addCategory } from './actions'

export default function AddCategoryForm() {
  return (
    <form action={addCategory} className="mb-8 p-4 border rounded-lg bg-brand-surface">
      <h3 className="text-xl font-semibold mb-4 text-brand-text">Añadir Nueva Categoría</h3>
      <input
        type="text"
        name="name"
        placeholder="Nombre de la categoría"
        required
        className="w-full p-2 border border-brand-bg rounded-md text-brand-text"
      />
      <button type="submit" className="mt-2 px-4 py-2 bg-brand-primary rounded-md text-brand-text-light hover:bg-brand-primary/90">
        Guardar
      </button>
    </form>
  )
}