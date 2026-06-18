import { StudentsForm } from '@/components/students-form'
import { StudentsSearch } from '@/components/students-search'

import { createClient } from '@/lib/server'

export default async function StudentPage() {
  const supabase = await createClient()

  const { data: students } = await supabase
    .from('students')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Клієнти
        </h1>

        <StudentsForm />
      </div>
      <StudentsSearch students={students || []} />

    </div >
  )
}