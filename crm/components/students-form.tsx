'use client'

import { addStudent } from '@/app/action/studentsBD'
import { useRef, useEffect, useActionState } from 'react'
const initialState = {
  error: ''
}

export function StudentsForm() {
  const [state, formAction] = useActionState(addStudent, initialState)

  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
    }
  }, [state.success])

  return (
    <form
      ref={formRef}
      className="space-y-4"
      action={formAction}
    >
      <div className="flex gap-2">

        <input
          name="full_name"
          type="text"
          placeholder="Full name"
          className="border rounded-lg p-2"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border rounded-lg p-2"
        />

        <input
          name="phone"
          type="text"
          placeholder="Phone"
          className="border rounded-lg p-2"
        />

        <input
          name="course"
          type="text"
          placeholder="Course"
          className="border rounded-lg p-2"
        />

      </div>

      {state.error && (
        <p className="text-sm text-red-500">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        className="bg-black text-white rounded-lg px-4 py-2"
      >
        Add student
      </button>
    </form>
  )
}