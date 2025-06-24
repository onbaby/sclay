"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface CountUpProps {
  end: number
  start?: number
  duration?: number
  delay?: number
  prefix?: string
  suffix?: string
  className?: string
  threshold?: number
  once?: boolean
  decimals?: number
}

export function CountUp({
  end,
  start = 0,
  duration = 2000,
  delay = 0,
  prefix = "",
  suffix = "",
  className,
  threshold = 0.1,
  once = true,
  decimals = 0,
}: CountUpProps) {
  const [count, setCount] = useState(start)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const countRef = useRef<number>(start)
  const startTimeRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!once) {
          setIsVisible(false)
          setCount(start)
          countRef.current = start
          startTimeRef.current = null
          if (rafRef.current) {
            cancelAnimationFrame(rafRef.current)
          }
        }
      },
      {
        threshold,
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [once, threshold, start])

  useEffect(() => {
    if (!isVisible) return

    let timeoutId: NodeJS.Timeout | null = null

    if (delay > 0) {
      timeoutId = setTimeout(() => {
        startAnimation()
      }, delay)
    } else {
      startAnimation()
    }

    function startAnimation() {
      const animate = (timestamp: number) => {
        if (!startTimeRef.current) {
          startTimeRef.current = timestamp
        }

        const progress = Math.min((timestamp - startTimeRef.current) / duration, 1)
        const currentCount = start + (end - start) * easeOutQuart(progress)
        countRef.current = currentCount
        setCount(currentCount)

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate)
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isVisible, start, end, duration, delay])

  // Easing function for smoother animation
  const easeOutQuart = (x: number): number => {
    return 1 - Math.pow(1 - x, 4)
  }

  const formattedCount = count.toFixed(decimals)

  return (
    <span ref={ref} className={cn(className)}>
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  )
}
