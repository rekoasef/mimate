// src/app/admin/products/actions.ts
'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function upsertProduct(formData: FormData) {
  const supabase = createServerComponentClient({ cookies })
  
  const id = formData.get('id') as string | null;
  // ... (obtener todos los demás campos del formulario no cambia)
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const sale_price = parseFloat(formData.get('sale_price') as string)
  const cost_price = parseFloat(formData.get('cost_price') as string)
  const stock = parseInt(formData.get('stock') as string, 10)
  const category_id = parseInt(formData.get('category_id') as string, 10)
  const is_featured = formData.get('is_featured') === 'on'
  const is_visible = formData.get('is_visible') === 'on'

  // --- NUEVA LÓGICA PARA MANEJAR LA IMAGEN ---
  const image = formData.get('image') as File;
  const current_image_url = formData.get('current_image_url') as string;
  const delete_image = formData.get('delete_image') === 'on';

  let image_url = current_image_url;

  if (delete_image && current_image_url) {
    // Si se marca "eliminar", borramos la imagen del storage y ponemos la URL a null.
    const { error: deleteError } = await supabase.storage.from('product_images').remove([current_image_url]);
    if (deleteError) console.error('Error deleting image:', deleteError);
    image_url = null;
  } else if (image && image.size > 0) {
    // Si se sube una imagen nueva, reemplazamos la anterior.
    if (current_image_url) {
        // Borramos la imagen vieja para no dejar basura en el storage.
        const { error: deleteError } = await supabase.storage.from('product_images').remove([current_image_url]);
        if (deleteError) console.error('Error deleting old image:', deleteError);
    }
    const { data: imageData, error: uploadError } = await supabase.storage.from('product_images').upload(`${Date.now()}_${image.name}`, image);
    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return { error: 'Error al subir la nueva imagen.' };
    }
    image_url = imageData.path;
  }
  // Si no ocurre ninguna de las dos, image_url simplemente conserva su valor original (current_image_url)
  // --- FIN DE LA NUEVA LÓGICA ---

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

// La función deleteProduct no necesita cambios.
export async function deleteProduct(formData: FormData) {
    const id = formData.get('id') as string;
    const imageUrl = formData.get('image_url') as string;
    const supabase = createServerComponentClient({ cookies });

    if (imageUrl) {
        await supabase.storage.from('product_images').remove([imageUrl]);
    }
    await supabase.from('products').delete().eq('id', id);

    revalidatePath('/admin/products');
}