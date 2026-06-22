'use client'

import { addOrder } from '@/app/action/ordersBD'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const initialState = {
  error: '',
}

// Додаємо пропс students, який отримуємо з батьківської сторінки
export function OrderForm({ students }: { students: any[] }) {
  const [state, formAction, isPending] = useActionState(addOrder, initialState)
  
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
        <Button variant="default">Додати замовлення</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Нове замовлення</DialogTitle>
          <DialogDescription>
            Оберіть замовника та введіть дані замовлення.
          </DialogDescription>
        </DialogHeader>

        <form ref={formRef} action={formAction} className="space-y-4">
          {state.error && (
            <p className="text-sm text-red-500 font-medium">{state.error}</p>
          )}

          {/* Вибір студента через Select */}
          <div className="space-y-2">
            <Label htmlFor="student_id">Замовник</Label>
            <Select name="student_id" required>
              <SelectTrigger>
                <SelectValue placeholder="Оберіть замовника" />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Опис</Label>
            <Input 
              id="description"
              name="description" 
              type="text" 
              placeholder="Наприклад: Оплата за курс" 
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Сума</Label>
            <Input 
              id="amount"
              name="amount" 
              type="number" 
              placeholder="0.00" 
              required 
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