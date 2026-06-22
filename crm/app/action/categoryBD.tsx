'use server'

import { createClient } from '@/lib/server'
import { revalidatePath } from 'next/cache'

export async function addCategory(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Користувач не авторизований' }
  }

  const name = formData.get('name') as string
  const type = formData.get('type') as string

  if (!name?.trim() || !type?.trim()) {
    return { error: "Назва та тип категорії є обов'язковими" }
  }

  const { error } = await supabase.from('categories').insert({
    user_id: user.id,
    name: name.trim(),
    type: type,
  })

  if (error) return { error: error.message }

  revalidatePath('/finance/categories') 
  return { success: true }
}

export async function deleteCategory(formData: FormData) {
  const supabase = await createClient()
  
  // Додаємо перевірку користувача, щоб уникнути помилок RLS при видаленні
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Користувач не авторизований' }

  const id = formData.get('id') as string
  if (!id) return { error: 'ID категорії відсутній' }

  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id) // Видаляємо лише якщо категорія належить цьому користувачу

  if (error) {
    console.error('Помилка видалення:', error.message)
    return { error: error.message }
  }

  revalidatePath('/finance/categories')
  revalidatePath('/finance/transaction')
  return { success: true }
}