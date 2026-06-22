'use client'

import { addTransaction } from '@/app/action/transactionBD'
import { useRef, useEffect, useState, useActionState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

const initialState = {
  error: '',
}

interface Category {
  id: string;
  name: string;
}

interface TransactionFormProps {
  categories: Category[];
}

export function TransactionForm({ categories }: TransactionFormProps) {
  const [state, formAction, isPending] = useActionState(addTransaction, initialState)


  const formRef = useRef<HTMLFormElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
      setIsOpen(false)
    }
  }, [state.success])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Додати транзакцію</Button>
      </DialogTrigger>
      {/* Слегка увеличили ширину окна для удобства (sm:max-w-md) */}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Нова транзакція</DialogTitle>
          <DialogDescription>
            Введіть деталі фінансової операції.
          </DialogDescription>
        </DialogHeader>

        <form ref={formRef} action={formAction} className="space-y-4">
          {state.error && (
            <p className="text-sm text-red-500 font-medium">{state.error}</p>
          )}

          {/* Тип операції та Спосіб оплати (в один ряд) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Тип операції</Label>
              <Select name="type" required>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Оберіть тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Дохід</SelectItem>
                  <SelectItem value="expense">Витрата</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment_method">Спосіб оплати</Label>
              <Select name="payment_method" required>
                <SelectTrigger id="payment_method">
                  <SelectValue placeholder="Оберіть спосіб" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Картка</SelectItem>
                  <SelectItem value="cash">Готівка</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Категорія */}
          <div className="space-y-2">
            <Label htmlFor="category_id">Категорія</Label>
            <Select name="category_id" required>
              <SelectTrigger id="category_id">
                <SelectValue placeholder="Оберіть категорію" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Сума та Дата (в один ряд) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Сума</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="transaction_date">Дата</Label>
              <Input
                id="transaction_date"
                name="transaction_date"
                type="date"
                // За замовчуванням підставляємо сьогоднішню дату
                defaultValue={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          {/* Опис */}
          <div className="space-y-2">
            <Label htmlFor="description">Опис (необов'язково)</Label>
            <Input
              id="description"
              name="description"
              type="text"
              placeholder="Наприклад: Оплата за дизайн..."
            />
          </div>

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">Скасувати</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Збереження...' : 'Зберегти'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}