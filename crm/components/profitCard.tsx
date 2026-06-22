import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react"

interface NetIncomeCardProps {
  amount: number // Сюди передаєш чистий дохід (наприклад: 2500.50)
  percentageChange?: string // Наприклад: "+12% за минулий місяць" (необов'язково)
}

export function NetIncomeCard({ amount, percentageChange }: NetIncomeCardProps) {
  const isPositive = amount >= 0

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Чистий дохід
        </CardTitle>
        <div className={`p-2 rounded-md ${isPositive ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
          <DollarSign className={`h-4 w-4 ${isPositive ? 'text-green-500' : 'text-red-500'}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold tracking-tight ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? "+" : ""}{amount.toLocaleString("uk-UA", { style: "currency", currency: "UAH" })}
        </div>
        {percentageChange && (
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            {isPositive ? (
              <ArrowUpRight className="h-3 w-3 text-green-500 inline" />
            ) : (
              <ArrowDownRight className="h-3 w-3 text-red-500 inline" />
            )}
            {percentageChange}
          </p>
        )}
      </CardContent>
    </Card>
  )
}