"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface HoverCardProps {
  children: React.ReactNode
  className?: string
  hoverClassName?: string
}

export function HoverCard({ children, className, hoverClassName }: HoverCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn(className, isHovered && hoverClassName)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  )
}
