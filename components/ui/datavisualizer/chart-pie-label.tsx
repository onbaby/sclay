"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A pie chart with a label"

const chartData = [
  { browser: "Did (%)", visitors: 79, fill: "#22B154" },
  { browser: "Didn't (%)", visitors: 21, fill: "#1E293B" },
  
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function ChartPieLabel() {
  return (
    <Card className="flex flex-col max-w-sm w-full h-[440px] md:max-w-none md:rounded-none md:border-0">
      <CardHeader className="items-center pb-0">
        <CardTitle>Employee Use of AI</CardTitle>
        <CardDescription>Businesses that gave employees access to AI tools</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="visitors" label nameKey="browser" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <p className="leading-none text-muted-foreground text-center">
          <span className="font-medium">
            Businesses who gave employees access to AI tools saw a
          </span>{" "}
          <span className="bg-green-500/30 text-green-400 font-bold px-2 rounded mx-1 whitespace-nowrap">
            10% increase
          </span>{" "}
          in annual revenue growth compared to businesses who didn't.
        </p>
      </CardFooter>
    </Card>
  )
}
