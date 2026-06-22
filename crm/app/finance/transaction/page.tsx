import { createClient } from "@/lib/server";
import { TransactionForm } from "@/components/transaction-form";
import { TransactionsSearch } from "@/components/transactions-search";


export default async function TransactionPage() {
  const supabase = await createClient()

  // 1. Получаем транзакции (они понадобятся тебе для вывода таблицы ниже)
  const { data: transactions } = await supabase
    .from('transactions')
    .select(`
      id,
      category_name,
      amount,
      type,
      payment_method,
      transaction_date,
      description
    `)

  // 2. ДОБАВЛЕНО: Получаем категории из базы данных для селекта в форме
 const { data: categories } = await supabase.from('categories').select('id, name') // Нам нужны только id и name для выпадающего списка

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Транзакції
        </h1>

        {/* 3. Передаем категории в форму. 
            Обязательно используем || [], чтобы если база пустая (Supabase вернет null), 
            компонент получил пустой массив, а не undefined, и .map() не упал */}
        <TransactionForm categories={categories || []}/>
      </div>
        <TransactionsSearch transactions={transactions || []} />

      {/* Здесь в будущем можно будет вывести саму таблицу с transactions */}
    </div>
  )
}