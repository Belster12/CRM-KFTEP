'use server'

import { createClient } from '@/lib/server'
import { revalidatePath } from 'next/cache'

export async function addTransaction(prevstate: any, formData: FormData) {
  const supabase = await createClient()

  // 1. Обов'язково спочатку перевіряємо користувача
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  // 2. Дістаємо дані з форми (ВИПРАВЛЕНО: беремо саме category_id)
  const categoryId = formData.get('category_id') as string
  const amount = formData.get('amount') as string
  const type = formData.get('type') as string
  const payment_method = formData.get('payment_method') as string
  const transaction_date = formData.get('transaction_date') as string
  const description = formData.get('description') as string

  // 3. Шукаємо назву категорії в базі за її ID
  let categoryName = 'Невідома категорія'
  
  if (categoryId) {
    const { data: categoryData } = await supabase
      .from('categories')
      .select('name')
      .eq('id', categoryId)
      .single()

    if (categoryData?.name) {
      categoryName = categoryData.name
    }
  }

  // 4. Записуємо транзакцію в базу даних
  const { error } = await supabase.from('transactions').insert({    // Зберігаємо ID для зв'язку (foreign key)
    category_name: categoryName, // Зберігаємо назву для відображення
    amount: parseFloat(amount) || 0,
    type,
    payment_method,
    transaction_date,
    description,
    user_id: user.id, 
  })

  if (error) {
    return { error: error.message }
  }

  // 5. Оновлюємо кеш шляхів (перевірте, який у вас шлях, можливо /finance/transactions)
  revalidatePath('/transactions')

  return { success: true }
}