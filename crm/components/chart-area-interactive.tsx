'use client'

import * as React from 'react'

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
} from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

type Student = {
  id: string
  created_at: string
}

type Props = {
  students: Student[]
}

export function ChartAreaInteractive({
  students,
}: Props) {

  const chartData = React.useMemo(() => {
    const grouped: Record<string, number> = {}

    students.forEach((student) => {
      const date = new Date(student.created_at)
        .toISOString()
        .split('T')[0]

      grouped[date] = (grouped[date] || 0) + 1
    })

    return Object.entries(grouped).map(
      ([date, students]) => ({
        date,
        students,
      })
    )
  }, [students])

  return (
    <Card>

      <CardHeader>
        <CardTitle>
          Student Registrations
        </CardTitle>

        <CardDescription>
          New students over time
        </CardDescription>
      </CardHeader>

      <CardContent>

        <ChartContainer
          config={{
            students: {
              label: 'Students',
              color: 'var(--primary)',
            },
          }}
          className="h-[300px] w-full"
        >

          <AreaChart data={chartData}>

            <defs>
              <linearGradient
                id="fillStudents"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--primary)"
                  stopOpacity={0.8}
                />

                <stop
                  offset="95%"
                  stopColor="var(--primary)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString(
                  'en-US',
                  {
                    month: 'short',
                    day: 'numeric',
                  }
                )
              }}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey="students"
              type="natural"
              fill="url(#fillStudents)"
              stroke="var(--primary)"
            />

          </AreaChart>

        </ChartContainer>

      </CardContent>

    </Card>
  )
}