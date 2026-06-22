import { createClient } from "@/lib/server"
import { NetIncomeCard } from "@/components/profitCard"
import { ExpensesCard } from "@/components/expensesCard"
import { PeriodStats } from "@/components/PeriodStats"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return <div className="p-6 text-red-500">Будь ласка, авторизуйтесь.</div>

  // Завантажуємо транзакції (цього разу обов'язково беремо transaction_date)
  const { data: transactions } = await supabase
    .from('transactions')
    .select('amount, type, transaction_date')
    .eq('user_id', user.id)

  // Готуємо змінні для загальних карток (топ дашборду)
  let totalIncome = 0
  let totalExpenses = 0

  // Структури для періодичного компонента
  const todayStats = { income: 0, expenses: 0, profit: 0 }
  const weekStats = { income: 0, expenses: 0, profit: 0 }
  const monthStats = { income: 0, expenses: 0, profit: 0 }

  // Поточні дати для порівняння
  const now = new Date()

  // Початок сьогоднішнього дня (00:00:00)
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  // Початок тижня (припустимо, з понеділка)
  const currentDay = now.getDay()
  const distanceToMonday = currentDay === 0 ? 6 : currentDay - 1
  const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - distanceToMonday)

  // Початок місяця
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  if (transactions) {
    transactions.forEach((tx) => {
      const amount = Number(tx.amount) || 0
      const txDate = new Date(tx.transaction_date)

      // 1. Рахуємо загальну статистику (за весь час)
      if (tx.type === 'income') totalIncome += amount
      if (tx.type === 'expense') totalExpenses += amount

      // 2. Розподіляємо за періодами
      // А) Сьогодні
      if (txDate >= startOfToday) {
        if (tx.type === 'income') todayStats.income += amount
        if (tx.type === 'expense') todayStats.expenses += amount
      }

      // Б) Цей тиждень
      if (txDate >= startOfWeek) {
        if (tx.type === 'income') weekStats.income += amount
        if (tx.type === 'expense') weekStats.expenses += amount
      }

      // В) Цей місяць
      if (txDate >= startOfMonth) {
        if (tx.type === 'income') monthStats.income += amount
        if (tx.type === 'expense') monthStats.expenses += amount
      }
    })
  }

  // Розраховуємо чистий прибуток (чистий дохід) для кожного періоду
  todayStats.profit = todayStats.income - todayStats.expenses
  weekStats.profit = weekStats.income - weekStats.expenses
  monthStats.profit = monthStats.income - monthStats.expenses

  const totalNetIncome = totalIncome - totalExpenses

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Фінансовий огляд</h1>
        <p className="text-sm text-muted-foreground">Актуальний стан вашого бюджету</p>
      </div>

      {/* Верхні картки (Загальний стан) */}
      <div className="grid gap-6 sm:grid-cols-2 w-full">
        <NetIncomeCard amount={totalNetIncome} percentageChange="За весь час" />
        <ExpensesCard amount={totalExpenses} percentageChange="За весь час" />
      </div>

      {/* Нижній великий компонент періодів */}
      <div className="pt-2">
        <PeriodStats
          today={todayStats}
          week={weekStats}
          month={monthStats}
        />
      </div>
    </div>
  )
}