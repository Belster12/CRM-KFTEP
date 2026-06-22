import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, ArrowUpRight } from "lucide-react"

interface ExpensesCardProps {
  amount: number // Сюди передаєш суму витрат (наприклад: 14200)
  percentageChange?: string // Наприклад: "+4% порівняно з минулим тижнем"
}

export function ExpensesCard({ amount, percentageChange }: ExpensesCardProps) {
  // Витрати зазвичай показують як позитивне число для сприйняття, але у червоному кольорі
  const displayAmount = Math.abs(amount)

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Загальні витрати
        </CardTitle>
        <div className="p-2 bg-red-500/10 rounded-md">
          <CreditCard className="h-4 w-4 text-red-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          {displayAmount.toLocaleString("uk-UA", { style: "currency", currency: "UAH" })}
        </div>
        {percentageChange && (
          <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium">
            <ArrowUpRight className="h-3 w-3" />
            {percentageChange}
          </p>
        )}
      </CardContent>
    </Card>
  )
}