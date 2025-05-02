"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

type OptimizedMotionProps = {
  children: React.ReactNode
  className?: string
  variants: any
  initial?: string | object
  animate?: string | object
  transition?: object
  custom?: any
  layoutId?: string
  whileHover?: object
  whileTap?: object
  onAnimationComplete?: () => void
}

export default function OptimizedMotion({
  children,
  className,
  variants,
  initial = "initial",
  animate = "animate",
  transition,
  custom,
  layoutId,
  whileHover,
  whileTap,
  onAnimationComplete,
  ...props
}: OptimizedMotionProps) {
  const prefersReducedMotion = useReducedMotion()
  const [isLowPerfDevice, setIsLowPerfDevice] = useState(false)

  useEffect(() => {
    const checkPerformance = () => {
      const memory = (navigator as any).deviceMemory
      const cores = navigator.hardwareConcurrency

      if ((memory && memory < 4) || (cores && cores < 4)) {
        setIsLowPerfDevice(true)
      }
    }

    try {
      checkPerformance()
    } catch (e) {
      console.error("Could not check device performance:", e)
    }
  }, [])

  const shouldReduceMotion = prefersReducedMotion || isLowPerfDevice || window.prefersReducedMotion

  if (shouldReduceMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial={initial}
      animate={animate}
      transition={transition}
      custom={custom}
      layoutId={layoutId}
      whileHover={whileHover}
      whileTap={whileTap}
      onAnimationComplete={onAnimationComplete}
      {...props}
    >
      {children}
    </motion.div>
  )
}
