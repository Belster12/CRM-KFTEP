'use client'

import { useMemo, useState, useTransition } from 'react'

import {
  deleteStudent,
  toggleStudentStatus
} from '@/app/action/studentsBD'

type Student = {
  id: string
  full_name: string
  email: string
  course: string
  phone: string
  status: string
}

type Props = {
  students: Student[]
}

export function StudentsSearch({ students }: Props) {
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const [isPending, startTransition] = useTransition()

  const filteredStudents = useMemo(() => {
    const searchLower = search.toLowerCase()

    const filtered = students.filter((student) =>
      student.full_name?.toLowerCase().includes(searchLower) ||
      student.email?.toLowerCase().includes(searchLower) ||
      student.course?.toLowerCase().includes(searchLower) ||
      student.phone?.toLowerCase().includes(searchLower)
    )

    return filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.full_name.localeCompare(b.full_name)
      }

      return b.full_name.localeCompare(a.full_name)
    })
  }, [students, search, sortOrder])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-500/20 text-green-500'

      case 'pending':
        return 'bg-yellow-500/20 text-yellow-500'

      case 'inactive':
        return 'bg-red-500/20 text-red-500'

      default:
        return 'bg-zinc-500/20 text-zinc-500'
    }
  }

  const handleToggle = (id: string) => {
    startTransition(async () => {
      await toggleStudentStatus(id)
    })
  }

  const handleDelete = (id: string) => {
    const confirmed = confirm(
      'Are you sure you want to delete this student?'
    )

    if (!confirmed) return

    startTransition(async () => {
      await deleteStudent(id)
    })
  }

  return (
    <div className="space-y-4">

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search students..."
          className="border rounded-lg p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() =>
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
          }
          className="border rounded-lg px-4 py-2"
        >
          Sort: {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
        </button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">

          <thead className="bg-zinc-100 dark:bg-zinc-900">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Course</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((student) => (
              <tr
                key={student.id}
                className="border-t"
              >
                <td className="p-3">
                  {student.full_name}
                </td>

                <td className="p-3">
                  {student.email}
                </td>

                <td className="p-3">
                  {student.course}
                </td>

                <td className="p-3">
                  {student.phone}
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      student.status
                    )}`}
                  >
                    {student.status}
                  </span>
                </td>

                <td className="p-3">
                  <div className="flex gap-2">

                    <button
                      onClick={() => handleToggle(student.id)}
                      disabled={isPending}
                      className="border rounded-lg px-3 py-1 text-sm"
                    >
                      Toggle
                    </button>

                    <button
                      onClick={() => handleDelete(student.id)}
                      disabled={isPending}
                      className="border border-red-500 text-red-500 rounded-lg px-3 py-1 text-sm"
                    >
                      Delete
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  )
}