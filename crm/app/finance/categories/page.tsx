// app/finance/categories/page.tsx
import { createClient } from '@/lib/server'
import { CategoryForm } from '@/components/category-form'
import { CategorySearch } from '@/components/category-search'

export default async function CategoriesPage() {
  const supabase = await createClient()


  const { data: categories } = await supabase
  .from('categories')
  .select('*')
  
  

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Список категорій</h1>
        {/* Форма для додавання */}
        <CategoryForm />
      </div>
      <CategorySearch categories={categories || []} />
      
      {/* Інтерактивний компонент з пошуком, сортуванням та таблицею */}
      
    </div>
  )
}