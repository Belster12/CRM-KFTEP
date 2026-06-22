'use client'

import * as React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

type Student = {
  id: string
  created_at: string
}

type Props = {
  students: Student[]
}

export function ChartAreaInteractive({ students }: Props) {
  const chartData = React.useMemo(() => {
    const grouped: Record<string, number> = {}

    // Групуємо кількість реєстрацій за кожним днем
    students.forEach((student) => {
      if (!student.created_at) return
      const date = student.created_at.split('T')[0] // Отримуємо чистий YYYY-MM-DD
      grouped[date] = (grouped[date] || 0) + 1
    })

    // Перетворюємо у масив та сортуємо за датою (від старіших до новіших)
    return Object.entries(grouped)
      .map(([date, count]) => ({
        date,
        students: count,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [students])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Реєстрації клієнтів</CardTitle>
        <CardDescription>Динаміка появи нових користувачів у CRM</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={{
            students: {
              label: 'Клієнти',
              color: 'var(--primary)',
            },
          }}
          className="h-[300px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillStudents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} className="stroke-muted/40" />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString('uk-UA', {
                  month: 'short',
                  day: 'numeric',
                })
              }}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent 
                  indicator="dot" 
                  labelFormatter={(value) => new Date(value).toLocaleDateString('uk-UA', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                />
              }
            />

            <Area
              dataKey="students"
              type="natural"
              fill="url(#fillStudents)"
              stroke="var(--primary)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}