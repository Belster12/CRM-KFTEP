'use client'

import { useMemo, useState, useTransition } from 'react'
// Не забудьте імпортувати deleteTransaction, якщо додасте кнопку видалення
import { addTransaction } from '@/app/action/transactionBD'

type Transaction = {
  id: string
  category_name: string
  amount: number
  type: string
  payment_method: string
  transaction_date: string
  description: string
}

type Props = {
  transactions: Transaction[]
}

export function TransactionsSearch({ transactions }: Props) {
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [isPending, startTransition] = useTransition()

  const filteredTransactions = useMemo(() => {
    const searchLower = search.toLowerCase()

    const filtered = transactions.filter((transaction) =>
      transaction.category_name?.toLowerCase().includes(searchLower) ||
      transaction.description?.toLowerCase().includes(searchLower) ||
      transaction.type?.toLowerCase().includes(searchLower) ||
      transaction.payment_method?.toLowerCase().includes(searchLower)
    )

    return filtered.sort((a, b) => {
      const dateA = new Date(a.transaction_date).getTime()
      const dateB = new Date(b.transaction_date).getTime()

      if (sortOrder === 'asc') {
        return dateA - dateB
      }
      return dateB - dateA
    })
  }, [transactions, search, sortOrder])

  // Переклад типу операції для таблиці
  const formatType = (type: string) => {
    switch (type.toLowerCase()) {
      case 'income': return 'Дохід'
      case 'expense': return 'Витрата'
      default: return type
    }
  }

  // Колір для типу операції
  const getTypeStyle = (type: string) => {
    return type.toLowerCase() === 'income' 
      ? 'bg-green-500/10 text-green-600 dark:text-green-400' 
      : 'bg-red-500/10 text-red-600 dark:text-red-400'
  }

  // Переклад способу оплати
  const formatPaymentMethod = (method: string) => {
    switch (method.toLowerCase()) {
      case 'card': return 'Картка'
      case 'cash': return 'Готівка'
      default: return method
    }
  }

  return (
    <div className="space-y-4">
      {/* Панель керування: Пошук та Сортування */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Пошук транзакції..."
          className="border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 bg-white dark:bg-zinc-950"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="border rounded-lg px-4 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
        >
          Сортування: {sortOrder === 'asc' ? 'Старіші спочатку' : 'Новіші спочатку'}
        </button>
      </div>

      {/* Таблиця транзакцій */}
      <div className="border rounded-lg overflow-hidden bg-white dark:bg-zinc-950 shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-900 border-b text-zinc-600 dark:text-zinc-400 font-medium">
            <tr>
              <th className="p-3 text-left">Категорія</th>
              <th className="p-3 text-left">Опис</th>
              <th className="p-3 text-left">Тип</th>
              <th className="p-3 text-left">Спосіб оплати</th>
              <th className="p-3 text-left">Дата</th>
              <th className="p-3 text-left">Сума</th>
              <th className="p-3 text-left">Дії</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-zinc-400">
                  Транзакцій не знайдено
                </td>
              </tr>
            ) : (
              filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                  <td className="p-3 font-medium text-zinc-900 dark:text-zinc-50">
                    {transaction.category_name}
                  </td>
                  <td className="p-3 text-zinc-600 dark:text-zinc-400 max-w-xs truncate">
                    {transaction.description || '—'}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getTypeStyle(transaction.type)}`}>
                      {formatType(transaction.type)}
                    </span>
                  </td>
                  <td className="p-3 text-zinc-600 dark:text-zinc-400">
                    {formatPaymentMethod(transaction.payment_method)}
                  </td>
                  <td className="p-3 text-zinc-600 dark:text-zinc-400">
                    {new Date(transaction.transaction_date).toLocaleDateString('uk-UA')}
                  </td>
                  <td className={`p-3 font-semibold ${transaction.type.toLowerCase() === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type.toLowerCase() === 'income' ? '+' : '-'}
                    {new Intl.NumberFormat('uk-UA', {
                      style: 'currency',
                      currency: 'UAH'
                    }).format(transaction.amount)}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      {/* Сюди можна буде помістити кнопку видалення, як у категоріях */}
                      <span className="text-xs text-muted-foreground">—</span>
                    </div>
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