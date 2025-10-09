// src/app/admin/categories/actions.ts
'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function addCategory(formData: FormData) {
  const name = formData.get('name') as string
  const supabase = createServerComponentClient({ cookies })
  
  if (name) {
    await supabase.from('categories').insert({ name })
    revalidatePath('/admin/categories') // Le decimos a Next.js que los datos de esta ruta han cambiado
  }
}

export async function deleteCategory(formData: FormData) {
  const id = formData.get('id') as string
  const supabase = createServerComponentClient({ cookies })

  if (id) {
    await supabase.from('categories').delete().eq('id', id)
    revalidatePath('/admin/categories')
  }
}