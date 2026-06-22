'use client'

import { addStudent } from '@/app/action/studentsBD'
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

const initialState = {
  error: '',
}

export function StudentsForm() {
  // Додаємо isPending для індикації завантаження
  const [state, formAction, isPending] = useActionState(addStudent, initialState)
  
  const formRef = useRef<HTMLFormElement>(null)
  // Стан для керування відкриттям/закриттям модалки
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
      setIsOpen(false) // Автоматично закриваємо діалог після успіху
    }
  }, [state.success])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Додати клієнта</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Новий клієнт</DialogTitle>
          <DialogDescription>
            Введіть дані клієнта. Натисніть зберегти, коли закінчите
          </DialogDescription>
        </DialogHeader>

       
        <form ref={formRef} action={formAction} className="space-y-4">
          {state.error && (
            <p className="text-sm text-red-500 font-medium">
              {state.error}
            </p>
          )}

          {/* Використовуємо компоненти shadcn: Label + Input */}
          <div className="space-y-2">
            <Label htmlFor="full_name">Повне ім'я</Label>
            <Input 
              id="full_name"
              name="full_name" 
              type="text" 
              placeholder="Іван Іванов" 
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              name="email" 
              type="email" 
              placeholder="example@kordon.com" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Телефон</Label>
            <Input 
              id="phone"
              name="phone" 
              type="text" 
              placeholder="+380..." 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Опис</Label>
            <Input 
              id="description"
              name="description" 
              type="text" 
              placeholder="..." 
            />
          </div>

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">Скасувати</Button>
            </DialogClose>
            {/* Використовуємо shadcn Button із станом isPending */}
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Збереження...' : 'Зберегти'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}