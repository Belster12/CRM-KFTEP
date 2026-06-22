// components/category-form.tsx
'use client'
import {addCategory} from '@/app/action/categoryBD'
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

const initialState = { error: '' }

export function CategoryForm() {
  const [state, formAction, isPending] = useActionState(addCategory, initialState)
  
  const formRef = useRef<HTMLFormElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset()
      setIsOpen(false)
    }
  }, [state?.success])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Додати категорію</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Нова категорія</DialogTitle>
          <DialogDescription>
            Створіть категорію для обліку доходів або витрат.
          </DialogDescription>
        </DialogHeader>

        <form ref={formRef} action={formAction} className="space-y-4">
          {state?.error && (
            <p className="text-sm text-red-500 font-medium">{state.error}</p>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Назва категорії</Label>
            <Input 
              id="name"
              name="name" 
              type="text" 
              placeholder="Наприклад: Оренда офісу" 
              required 
            />
          </div>

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