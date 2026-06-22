import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpCircle, ArrowDownCircle, Wallet } from "lucide-react"

interface StatValues {
  income: number
  expenses: number
  profit: number
}

interface PeriodStatsProps {
  today: StatValues
  week: StatValues
  month: StatValues
}

export function PeriodStats({ today, week, month }: PeriodStatsProps) {
  
  // Функція для красивого рендерингу рядків з даними
  const RenderPeriodData = ({ data }: { data: StatValues }) => {
    const isProfitPositive = data.profit >= 0

    return (
      <div className="grid gap-4 md:grid-cols-3 mt-2">
        {/* Доходи */}
        <Card className="border border-zinc-100 shadow-none bg-zinc-50/50 dark:bg-zinc-900/50">
          <CardContent className="pt-4 flex items-center gap-3">
            <ArrowUpCircle className="h-8 w-8 text-green-500 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground font-medium">Доходи</p>
              <p className="text-lg font-bold text-green-600">
                +{data.income.toLocaleString("uk-UA", { style: "currency", currency: "UAH" })}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Витрати */}
        <Card className="border border-zinc-100 shadow-none bg-zinc-50/50 dark:bg-zinc-900/50">
          <CardContent className="pt-4 flex items-center gap-3">
            <ArrowDownCircle className="h-8 w-8 text-red-500 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground font-medium">Витрати</p>
              <p className="text-lg font-bold text-red-600">
                -{data.expenses.toLocaleString("uk-UA", { style: "currency", currency: "UAH" })}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Прибуток */}
        <Card className="border border-zinc-100 shadow-none bg-zinc-50/50 dark:bg-zinc-900/50">
          <CardContent className="pt-4 flex items-center gap-3">
            <Wallet className={`h-8 w-8 shrink-0 ${isProfitPositive ? 'text-blue-500' : 'text-orange-500'}`} />
            <div>
              <p className="text-xs text-muted-foreground font-medium">Чистий прибуток</p>
              <p className={`text-lg font-bold ${isProfitPositive ? 'text-blue-600' : 'text-orange-600'}`}>
                {isProfitPositive ? "+" : ""}
                {data.profit.toLocaleString("uk-UA", { style: "currency", currency: "UAH" })}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <Card className="shadow-sm w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-bold tracking-tight">Періодичний звіт</CardTitle>
        <CardDescription>Порівняння фінансових показників за різні проміжки часу</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="month" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-2">
            <TabsTrigger value="today">Сьогодні</TabsTrigger>
            <TabsTrigger value="week">Цей тиждень</TabsTrigger>
            <TabsTrigger value="month">Цей місяць</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today">
            <RenderPeriodData data={today} />
          </TabsContent>
          
          <TabsContent value="week">
            <RenderPeriodData data={week} />
          </TabsContent>
          
          <TabsContent value="month">
            <RenderPeriodData data={month} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}