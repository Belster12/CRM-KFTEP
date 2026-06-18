// app/orders/page.tsx
import { createClient } from '@/lib/server'
import { OrdersSearch } from '@/components/orders-search'
import { OrderForm } from '@/components/order-form'

export default async function OrdersPage() {
  const supabase = await createClient()

  // Отримуємо студентів для випадаючого списку
  const { data: students } = await supabase.from('students').select('id, full_name')
  
  // Отримуємо замовлення з приєднаними даними студентів
  const { data: orders } = await supabase
    .from('orders')
    .select(`
      id,
      description,
      amount,
      status,
      students (full_name)
    `)

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Список замовлень</h1>
        {/* Форма для додавання */}
        <OrderForm students={students || []} />
      </div>
      
      {/* Інтерактивний компонент з пошуком, сортуванням та таблицею */}
      <OrdersSearch orders={orders || []} />
    </div>
  )
}