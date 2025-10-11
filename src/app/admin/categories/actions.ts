// src/app/admin/categories/actions.ts
'use server'

import { createServerClient } from '@supabase/ssr' // Importación actualizada
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function addCategory(formData: FormData) {
  const name = formData.get('name') as string
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  ) // Nueva forma de crear el cliente
  
  if (name) {
    await supabase.from('categories').insert({ name })
    revalidatePath('/admin/categories')
  }
}

export async function deleteCategory(formData: FormData) {
  const id = formData.get('id') as string
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  ) // Nueva forma de crear el cliente

  if (id) {
    await supabase.from('categories').delete().eq('id', id)
    revalidatePath('/admin/categories')
  }
}