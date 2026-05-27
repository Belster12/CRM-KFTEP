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
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Students
      </h1>

      <StudentsForm />

      <StudentsSearch students={students || []} />

    </div>
  )
}