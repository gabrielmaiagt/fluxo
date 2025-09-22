
'use client';

import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';

const chartData = [
  { date: '25/08', revenue: 0, expense: 0 },
  { date: '27/08', revenue: 0, expense: 0 },
  { date: '29/08', revenue: 0, expense: 0 },
  { date: '31/08', revenue: 0, expense: 0 },
  { date: '02/09', revenue: 0, expense: 0 },
  { date: '04/09', revenue: 0, expense: 0 },
  { date: '06/09', revenue: 0, expense: 0 },
  { date: '08/09', revenue: 0, expense: 0 },
  { date: '10/09', revenue: 0, expense: 0 },
  { date: '12/09', revenue: 0, expense: 0 },
  { date: '14/09', revenue: 0, expense: 0 },
  { date: '16/09', revenue: 200, expense: 100 },
  { date: '18/09', revenue: 1500, expense: 300 },
  { date: '20/09', revenue: 10000, expense: 1200 },
  { date: '22/09', revenue: 4000, expense: 2000 },
];

const chartConfig = {
  revenue: {
    label: 'Receitas',
    color: 'hsl(var(--chart-2))',
  },
  expense: {
    label: 'Despesas',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export function Dashboard() {
  return (
    <div className="w-full mt-8">
    <Card className="bg-white/5 border-white/20 text-white">
      <CardHeader>
        <CardTitle className="text-white">Fluxo de Caixa</CardTitle>
        <CardDescription className="text-white/60">
          Resultados recentes de campanhas e ofertas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -20,
              right: 12,
              top: 10
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 5)}
              className="fill-white/70"
            />
             <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value: number) => `R$${value.toLocaleString('pt-BR')}`}
                className="fill-white/70"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent 
                indicator="dot"
                formatter={(value, name) => (
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: chartConfig[name as keyof typeof chartConfig].color}}></div>
                      <span className="capitalize text-white/70">{chartConfig[name as keyof typeof chartConfig].label}</span>
                      <span className="font-bold text-white">
                        {`R$${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                      </span>
                    </div>
                )}
                labelFormatter={(label) => <div className='font-bold text-lg text-white'>{label}</div>}
              />}
            />
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-expense)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-expense)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="revenue"
              type="natural"
              fill="url(#fillRevenue)"
              fillOpacity={0.4}
              stroke="var(--color-revenue)"
              stackId="a"
            />
            <Area
              dataKey="expense"
              type="natural"
              fill="url(#fillExpense)"
              fillOpacity={0.4}
              stroke="var(--color-expense)"
              stackId="a"
            />
             <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
    </div>
  );
}
