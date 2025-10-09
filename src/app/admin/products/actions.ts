// src/app/admin/products/actions.ts
'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

// Esta acción ahora maneja tanto la creación como la edición
export async function upsertProduct(formData: FormData) {
  const supabase = createServerComponentClient({ cookies })
  
  const id = formData.get('id') as string | null
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const sale_price = parseFloat(formData.get('sale_price') as string)
  const cost_price = parseFloat(formData.get('cost_price') as string)
  const stock = parseInt(formData.get('stock') as string, 10)
  const category_id = parseInt(formData.get('category_id') as string, 10)
  const is_featured = formData.get('is_featured') === 'on'
  const is_visible = formData.get('is_visible') === 'on'
  const image = formData.get('image') as File

  let image_url = formData.get('current_image_url') as string;

  // Si se subió una nueva imagen, la procesamos
  if (image && image.size > 0) {
    const { data: imageData, error: imageError } = await supabase.storage
      .from('product_images')
      .upload(`${Date.now()}_${image.name}`, image)

    if (imageError) {
      console.error('Error uploading image:', imageError)
      return { error: 'Error al subir la imagen.' }
    }
    image_url = imageData.path
  }
  
  const productData = { name, description, sale_price, cost_price, stock, category_id, is_featured, is_visible, image_url };

  if (id) {
    // Si hay un ID, actualizamos el producto existente
    const { error } = await supabase.from('products').update(productData).eq('id', id);
    if (error) {
      console.error('Update Error:', error);
      return { error: 'Error al actualizar el producto.' }
    }
  } else {
    // Si no hay ID, insertamos un nuevo producto
    const { error } = await supabase.from('products').insert(productData);
    if (error) {
      console.error('Insert Error:', error);
      return { error: 'Error al crear el producto.' }
    }
  }
  
  revalidatePath('/admin/products')
  return { success: true }
}

export async function deleteProduct(formData: FormData) {
    const id = formData.get('id') as string;
    const imageUrl = formData.get('image_url') as string;
    const supabase = createServerComponentClient({ cookies });

    if (imageUrl) {
        const { error } = await supabase.storage.from('product_images').remove([imageUrl]);
        if (error) console.error('Image Deletion Error:', error);
    }
    await supabase.from('products').delete().eq('id', id);

    revalidatePath('/admin/products');
}