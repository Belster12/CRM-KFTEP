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
  totalStudents: number
  activeStudents: number
  finishedStudents: number
  newStudents: number
}

export function SectionCards({
  totalStudents,
  activeStudents,
  finishedStudents,
  newStudents,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">

      {/* TOTAL */}

      <Card>
        <CardHeader>

          <CardDescription>
            Total Students
          </CardDescription>

          <CardTitle className="text-3xl font-bold">
            {totalStudents}
          </CardTitle>

          <CardAction>
            <Badge variant="outline">
              <Users className="size-4" />
            </Badge>
          </CardAction>

        </CardHeader>

        <CardFooter className="text-sm text-muted-foreground">
          Total registered students
        </CardFooter>
      </Card>

      {/* ACTIVE */}

      <Card>
        <CardHeader>

          <CardDescription>
            Active Students
          </CardDescription>

          <CardTitle className="text-3xl font-bold">
            {activeStudents}
          </CardTitle>

          <CardAction>
            <Badge variant="outline">
              <UserCheck className="size-4" />
            </Badge>
          </CardAction>

        </CardHeader>

        <CardFooter className="text-sm text-muted-foreground">
          Currently studying
        </CardFooter>
      </Card>

      {/* FINISHED */}

      <Card>
        <CardHeader>

          <CardDescription>
            Finished Courses
          </CardDescription>

          <CardTitle className="text-3xl font-bold">
            {finishedStudents}
          </CardTitle>

          <CardAction>
            <Badge variant="outline">
              <GraduationCap className="size-4" />
            </Badge>
          </CardAction>

        </CardHeader>

        <CardFooter className="text-sm text-muted-foreground">
          Students who completed courses
        </CardFooter>
      </Card>

      {/* NEW */}

      <Card>
        <CardHeader>

          <CardDescription>
            New This Month
          </CardDescription>

          <CardTitle className="text-3xl font-bold">
            {newStudents}
          </CardTitle>

          <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon className="size-4" />
            </Badge>
          </CardAction>

        </CardHeader>

        <CardFooter className="text-sm text-muted-foreground">
          New registrations this month
        </CardFooter>
      </Card>

    </div>
  )
}