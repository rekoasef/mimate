// src/app/admin/categories/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AddCategoryForm from './AddCategoryForm'
import { deleteCategory } from './actions'
export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: categories } = await supabase.from('categories').select('id, name')

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-brand-secondary">Gestión de Categorías</h2>
      
      {/* Usamos el nuevo componente de cliente para el formulario */}
      <AddCategoryForm />

      <div>
        <h3 className="text-xl font-semibold mb-4 text-brand-text">Categorías Existentes</h3>
        <ul className="space-y-2">
          {categories?.map((category) => (
            <li key={category.id} className="flex justify-between items-center p-3 bg-brand-surface border border-gray-200 rounded-md">
              <span className="text-brand-text">{category.name}</span>
              {/* El formulario de borrado sigue funcionando de la misma manera */}
              <form action={deleteCategory}>
                <input type="hidden" name="id" value={category.id} />
                <button type="submit" className="px-3 py-1 bg-brand-accent text-white rounded hover:bg-brand-accent/90">
                  Eliminar
                </button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}