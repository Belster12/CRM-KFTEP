'use client'

import { useMemo, useState, useTransition } from 'react'
import { deleteCategory } from '@/app/action/categoryBD'

type Category = {
  id: string
  name: string
  type: string // 'income' або 'expense'
}

type Props = {
  categories: Category[]
}

export function CategorySearch({ categories }: Props) {
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [filterType, setFilterType] = useState<string>('all')

  const [isPending, startTransition] = useTransition()

  // Фільтрація та сортування категорій
  const filteredCategories = useMemo(() => {
    const searchLower = search.toLowerCase()

    let filtered = categories.filter((category) =>
      category.name?.toLowerCase().includes(searchLower)
    )

    // Фільтр за типом (дохід / витрата / всі)
    if (filterType !== 'all') {
      filtered = filtered.filter((cat) => cat.type === filterType)
    }

    return filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name)
      }
      return b.name.localeCompare(a.name)
    })
  }, [categories, search, sortOrder, filterType])

  // Стилі для типу операції (зелений для доходу, червоний для витрати)
  const getTypeBadgeStyle = (type: string) => {
    switch (type.toLowerCase()) {
      case 'income':
        return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'expense':
        return 'bg-red-500/10 text-red-500 border-red-500/20'
      default:
        return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
    }
  }

  // ВИПРАВЛЕНО: Ручне створення FormData для узгодження типів із Server Action
  const handleDelete = (id: string) => {
    const confirmed = confirm(
      "Ви впевнені, що хочете видалити цю категорію? Це також може вплинути на транзакції, прив'язані до неї."
    )

    if (!confirmed) return

    startTransition(async () => {
      const formData = new FormData()
      formData.append('id', id)

      await deleteCategory(formData)
    })
  }

  return (
    <div className="space-y-4">
      {/* Панель керування: Пошук, Фільтр та Сортування */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Пошук категорії..."
          className="border rounded-lg p-2 text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-zinc-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border rounded-lg p-2 text-sm bg-white focus:outline-none"
        >
          <option value="all">Усі типи</option>
          <option value="income">Доходи</option>
          <option value="expense">Витрати</option>
        </select>

        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="border rounded-lg px-4 py-2 text-sm hover:bg-zinc-50 active:bg-zinc-100 transition-colors"
        >
          Сортування: {sortOrder === 'asc' ? 'А-Я' : 'Я-А'}
        </button>
      </div>

      {/* Таблиця категорій */}
      <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 border-b text-zinc-600 font-medium">
            <tr>
              <th className="p-3 text-left">Назва категорії</th>
              <th className="p-3 text-left">Тип операції</th>
              <th className="p-3 text-right">Дії</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredCategories.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-4 text-center text-zinc-400">
                  Категорій не знайдено
                </td>
              </tr>
            ) : (
              filteredCategories.map((category) => (
                <tr key={category.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="p-3 font-medium text-zinc-900">
                    {category.name}
                  </td>

                  <td className="p-3">
                    <span className={`px-2 py-0.5 border rounded-full text-xs font-medium ${getTypeBadgeStyle(category.type)}`}>
                      {category.type === 'income' ? 'Дохід' : 'Витрата'}
                    </span>
                  </td>

                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDelete(category.id)}
                      disabled={isPending}
                      className="border border-red-200 hover:border-red-500 text-red-500 hover:bg-red-50 disabled:opacity-50 rounded-lg px-3 py-1 text-xs font-medium transition-colors"
                    >
                      Видалити
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}