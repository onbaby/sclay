"use client"

import { TrendingDown, TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { useState, useEffect } from "react"

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

export const description = "A line chart"

const chartData = [
  { month: "January", desktop:  305},
  { month: "February", desktop: 208 },
  { month: "March", desktop: 208 },
  { month: "April", desktop: 190 },
  { month: "May", desktop: 190 },
  { month: "June", desktop: 175 },
]

const chartConfig = {
  desktop: {
    label: "CPM",
    color: "#22C55E",
  },
} satisfies ChartConfig

interface ChartLineDefaultProps {
  inView: boolean;
  animationDelay?: number;
}

export function ChartLineDefault({ inView, animationDelay = 0 }: ChartLineDefaultProps) {
  const [displayData, setDisplayData] = useState<typeof chartData>([]);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setDisplayData(chartData);
      }, animationDelay);
      return () => clearTimeout(timer);
    } else {
      setDisplayData([]);
    }
  }, [inView, animationDelay]);

  return (
    <Card className="w-[500px] h-[440px] md:rounded-none md:border-0">
      <CardHeader>
        <CardTitle>Operating Costs</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={displayData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium text-muted-foreground">
          Trending down by <span className="bg-red-500/30 text-red-400 px-1 font-bold rounded">32%</span> <TrendingDown className="h-4 w-4 text-red-400" />
        </div>
        <div className="text-muted-foreground leading-none">
          After implementing streamlined workflows
        </div>
      </CardFooter>
    </Card>
  )
}
