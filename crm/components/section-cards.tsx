import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Users,
  GraduationCap,
  UserCheck,
  TrendingUpIcon,
} from 'lucide-react'

type Props = {
  totalStudents: number      // Загальна кількість клієнтів
  activeStudents: number     // Активні клієнти
  finishedStudents: number   // Клієнти, що завершили навчання
  newStudents: number        // Нові клієнти за місяць
}

export function SectionCards({
  totalStudents: totalClients,
  activeStudents: activeClients,
  finishedStudents: finishedClients,
  newStudents: newClients,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">

      {/* ВСЬОГО КЛІЄНТІВ */}
      <Card>
        <CardHeader>
          <CardDescription>
            Всього клієнтів
          </CardDescription>

          <CardTitle className="text-3xl font-bold">
            {totalClients}
          </CardTitle>

          <CardAction>
            <Badge variant="outline">
              <Users className="size-4" />
            </Badge>
          </CardAction>
        </CardHeader>

        <CardFooter className="text-sm text-muted-foreground">
          Загальна кількість зареєстрованих клієнтів
        </CardFooter>
      </Card>

      {/* АКТИВНІ */}
      <Card>
        <CardHeader>
          <CardDescription>
            Активні клієнти
          </CardDescription>

          <CardTitle className="text-3xl font-bold">
            {activeClients}
          </CardTitle>

          <CardAction>
            <Badge variant="outline">
              <UserCheck className="size-4" />
            </Badge>
          </CardAction>
        </CardHeader>

        <CardFooter className="text-sm text-muted-foreground">
          Клієнти, які навчаються на цей час
        </CardFooter>
      </Card>

      {/* ЗАВЕРШИЛИ */}
      <Card>
        <CardHeader>
          <CardDescription>
            Завершили навчання
          </CardDescription>

          <CardTitle className="text-3xl font-bold">
            {finishedClients}
          </CardTitle>

          <CardAction>
            <Badge variant="outline">
              <GraduationCap className="size-4" />
            </Badge>
          </CardAction>
        </CardHeader>

        <CardFooter className="text-sm text-muted-foreground">
          Клієнти, які успішно закінчили курси
        </CardFooter>
      </Card>

      {/* НОВІ ЗА МІСЯЦЬ */}
      <Card>
        <CardHeader>
          <CardDescription>
            Нові за місяць
          </CardDescription>

          <CardTitle className="text-3xl font-bold">
            {newClients}
          </CardTitle>

          <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon className="size-4" />
            </Badge>
          </CardAction>
        </CardHeader>

        <CardFooter className="text-sm text-muted-foreground">
          Нові реєстрації у поточному місяці
        </CardFooter>
      </Card>

    </div>
  )
}