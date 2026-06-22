'use server'

import { createClient } from '@/lib/server'
import { revalidatePath } from 'next/cache'

// Перейменовано на addOrder відповідно до логіки
export async function addOrder(prevstate: any, formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  // Отримуємо дані з форми замовлення
  const student_id = formData.get('student_id') as string
  const description = formData.get('description') as string
  const amount = formData.get('amount') as string

  if (!student_id || !description) {
    return { error: 'Student and description are required' }
  }

  const { error } = await supabase.from('orders').insert({
    student_id,
    description,
    amount: parseFloat(amount) || 0,
    status: 'active',
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/orders')
  return { success: true }
};

export async function toggleOrderStatus(id: string) {
  const supabase = await createClient()

  // Отримуємо поточний статус
  const { data: order } = await supabase
    .from('orders')
    .select('status')
    .eq('id', id)
    .single();

  if (!order) {
    return { error: 'Order not found' }
  }

  // Перемикаємо статус
  const newStatus = order.status === 'active' ? 'inactive' : 'active'
  
  const { error } = await supabase.from('orders')
    .update({ status: newStatus })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/orders')
  return { success: true }
};

export async function deleteOrder(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('orders').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/orders')
  return { success: true }
};