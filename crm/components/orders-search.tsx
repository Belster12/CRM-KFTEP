'use client'

import { useMemo, useState, useTransition } from 'react'
import {
  deleteOrder,
  toggleOrderStatus
} from '@/app/action/ordersDB'

type Order = {
  id: string
  description: string
  amount: number
  status: string
  // Supabase повертає зв'язані дані як об'єкт або масив об'єктів
  students: { full_name: string }[] | { full_name: string } | null
}

type Props = {
  orders: Order[]
}

export function OrdersSearch({ orders }: Props) {
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [isPending, startTransition] = useTransition()

  // Допоміжна функція для отримання імені студента
  const getStudentName = (students: Order['students']) => {
    if (Array.isArray(students)) return students[0]?.full_name || 'Без імені'
    return students?.full_name || 'Без імені'
  }

  const filteredOrders = useMemo(() => {
    const searchLower = search.toLowerCase()

    const filtered = orders.filter((order) => {
      const name = getStudentName(order.students).toLowerCase()
      return (
        order.description?.toLowerCase().includes(searchLower) ||
        name.includes(searchLower)
      )
    })

    return filtered.sort((a, b) => {
      const nameA = getStudentName(a.students)
      const nameB = getStudentName(b.students)
      return sortOrder === 'asc' 
        ? nameA.localeCompare(nameB) 
        : nameB.localeCompare(nameA)
    })
  }, [orders, search, sortOrder])

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-500/20 text-green-500' 
      : 'bg-red-500/20 text-red-500'
  }

  const handleToggle = (id: string) => {
    startTransition(async () => {
      await toggleOrderStatus(id)
    })
  }

  const handleDelete = (id: string) => {
    if (!confirm('Ви впевнені, що хочете видалити це замовлення?')) return
    startTransition(async () => {
      await deleteOrder(id)
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Пошук замовлення або клієнта..."
          className="border rounded-lg p-2 "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="border rounded-lg px-4 py-2"
        >
          Сортування: {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
        </button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-zinc-100 dark:bg-zinc-900">
            <tr>
              <th className="p-3 text-left">Клієнт</th>
              <th className="p-3 text-left">Опис</th>
              <th className="p-3 text-left">Сума</th>
              <th className="p-3 text-left">Статус</th>
              <th className="p-3 text-left">Дії</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-3">{getStudentName(order.students)}</td>
                <td className="p-3">{order.description}</td>
                <td className="p-3">{order.amount} грн</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggle(order.id)}
                      disabled={isPending}
                      className="border rounded-lg px-3 py-1 text-sm hover:bg-zinc-100"
                    >
                      Статус
                    </button>
                    <button
                      onClick={() => handleDelete(order.id)}
                      disabled={isPending}
                      className="border border-red-500 text-red-500 rounded-lg px-3 py-1 text-sm hover:bg-red-50"
                    >
                      Видалити
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