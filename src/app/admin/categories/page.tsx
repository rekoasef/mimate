// src/app/admin/categories/page.tsx
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import AddCategoryForm from './AddCategoryForm'
import { deleteCategory } from './actions'

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  )

  const { data: categories } = await supabase.from('categories').select('id, name').order('name')

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-brand-secondary">Categorías</h1>
        <p className="text-sm text-gray-400 mt-1">{categories?.length ?? 0} categorías registradas</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Add form */}
        <div>
          <AddCategoryForm />
        </div>

        {/* List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Categorías existentes</h3>
          </div>

          {categories && categories.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {categories.map((category) => (
                <li key={category.id} className="flex justify-between items-center px-5 py-3.5 hover:bg-gray-50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand-primary/60" />
                    <span className="text-sm font-medium text-brand-text">{category.name}</span>
                  </div>
                  <form action={deleteCategory}>
                    <input type="hidden" name="id" value={category.id} />
                    <button
                      type="submit"
                      className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      title="Eliminar categoría"
                      onClick={(e) => {
                        if (!confirm(`¿Eliminar la categoría "${category.name}"?`)) e.preventDefault();
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                      </svg>
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-5 py-10 text-center text-sm text-gray-400">
              No hay categorías aún. Creá la primera.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
