// src/app/admin/products/actions.ts
'use server'

import { createServerClient } from '@supabase/ssr' // Importación actualizada
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function upsertProduct(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  ) // Nueva forma de crear el cliente
  
  const id = formData.get('id') as string | null;
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const sale_price = parseFloat(formData.get('sale_price') as string)
  const cost_price = parseFloat(formData.get('cost_price') as string)
  const stock = parseInt(formData.get('stock') as string, 10)
  
  const categoryIdValue = formData.get('category_id') as string;
  const category_id = categoryIdValue ? parseInt(categoryIdValue, 10) : null;
  
  const is_featured = formData.get('is_featured') === 'on'
  const is_visible = formData.get('is_visible') === 'on'

  const image = formData.get('image') as File;
  const current_image_url = formData.get('current_image_url') as string;
  const delete_image = formData.get('delete_image') === 'on';

  let image_url: string | null = current_image_url;

  if (delete_image && current_image_url) {
    await supabase.storage.from('product_images').remove([current_image_url]);
    image_url = null;
  } else if (image && image.size > 0) {
    if (current_image_url) {
        await supabase.storage.from('product_images').remove([current_image_url]);
    }
    const { data: imageData, error: uploadError } = await supabase.storage.from('product_images').upload(`${Date.now()}_${image.name}`, image);
    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return { error: 'Error al subir la nueva imagen.' };
    }
    image_url = imageData.path;
  }

  const productData = { name, description, sale_price, cost_price, stock, category_id, is_featured, is_visible, image_url };

  if (id) {
    const { error } = await supabase.from('products').update(productData).eq('id', id);
    if (error) return { error: 'Error al actualizar el producto.' }
  } else {
    const { error } = await supabase.from('products').insert(productData);
    if (error) return { error: 'Error al crear el producto.' }
  }
  
  revalidatePath('/admin/products');
  return { success: true };
}

export async function deleteProduct(formData: FormData) {
    const id = formData.get('id') as string;
    const imageUrl = formData.get('image_url') as string;
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { get: (name) => cookieStore.get(name)?.value } }
    ) // Nueva forma de crear el cliente

    if (imageUrl) {
        await supabase.storage.from('product_images').remove([imageUrl]);
    }
    await supabase.from('products').delete().eq('id', id);

    revalidatePath('/admin/products');
}