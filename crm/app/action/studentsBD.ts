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
};

export async function toggleStudentStatus(id: string) {
  const supabase = await createClient()

  const { data: students } = await supabase
    .from('students')
    .select('status')
    .eq('id', id).single();

    if (!students) {
      return { error: 'Student not found' }
    }

    const { error } = await supabase.from('students')
    .update({ status: students.status === 'active' ? 'inactive' : 'active' })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/students')

  return { success: true }
};

export async function deleteStudent(id: string) {
  const supabase = await createClient()

  const {error} = await supabase.from('students').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }
}