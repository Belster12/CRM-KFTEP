'use server'

import { createClient } from '@/lib/server'
import { revalidatePath } from 'next/cache'

export async function addStudent(prevstate: any, formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const full_name = formData.get('full_name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const course = formData.get('course') as string

  if (!full_name?.trim()) {
    return { error: 'Name is required' }
  }

  const { error } = await supabase.from('students').insert({
    full_name,
    email,
    phone,
    course,
    status: 'active',
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/students')

  return { success: true }
}