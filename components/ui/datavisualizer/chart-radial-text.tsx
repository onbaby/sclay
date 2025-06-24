"use client"

import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"
import { useState, useEffect } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

export const description = "A radial chart with text"

interface ChartRadialTextProps {
  value: number;
  suffix: string;
  label: string;
  className?: string;
  inView: boolean;
  animationDelay?: number;
}

export function ChartRadialText({ value, suffix, label, className, inView, animationDelay = 0 }: ChartRadialTextProps) {
  const data = [{ browser: "value", visitors: value, fill: "#22B154" }];

  const chartConfig = {
    visitors: {
      label: label,
    },
    value: {
      label: label,
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig

  const [displayEndAngle, setDisplayEndAngle] = useState(0);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setDisplayEndAngle(250);
      }, animationDelay);
      return () => clearTimeout(timer);
    } else {
      setDisplayEndAngle(0);
    }
  }, [inView, animationDelay]);

  return (
    <Card className={cn("flex flex-col w-full h-[440px] md:rounded-none md:border-0", className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-white">Businesses Use of AI</CardTitle>
        <CardDescription>From 2023-2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
          className="mt-5"
            data={data}
            startAngle={0}
            endAngle={displayEndAngle}
            innerRadius={100}
            outerRadius={140}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[110, 90]}
            />
            <RadialBar dataKey="visitors" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-5xl font-bold"
                        >
                          {value.toLocaleString()}{suffix}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 40}
                          className="fill-muted-foreground text-lg"
                        >
                          {label}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          75% of organizations now use AI- <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
        in at least one business function, including generative and analytical AI
        </div>
      </CardFooter>
    </Card>
  )
}
