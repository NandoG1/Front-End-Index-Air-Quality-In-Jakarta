"use client"

import { useState, useCallback, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

interface ParameterSliderProps {
  name: string
  label: string
  unit: string
  min: number
  max: number
  step: number
  defaultValue: number
  onChange: (value: number) => void
  description?: string
}

export default function ParameterSlider({
  name,
  label,
  unit,
  min,
  max,
  step,
  defaultValue,
  onChange,
  description,
}: ParameterSliderProps) {
  const [value, setValue] = useState(defaultValue)
  const [isDragging, setIsDragging] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
      setPrefersReducedMotion(mediaQuery.matches || window.prefersReducedMotion)

      const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  const percentage = useCallback(() => ((value - min) / (max - min)) * 100, [value, min, max])

  const getColor = useCallback(() => {
    const percent = percentage()
    if (percent < 25) return "rgb(59, 130, 246)" 
    if (percent < 50) return "rgb(16, 185, 129)" 
    if (percent < 75) return "rgb(245, 158, 11)" 
    return "rgb(239, 68, 68)" 
  }, [percentage])

  const handleSliderChange = useCallback(
    (newValue: number[]) => {
      setValue(newValue[0])
      onChange(newValue[0])
    },
    [onChange],
  )

  const handleDragStart = useCallback(() => setIsDragging(true), [])
  const handleDragEnd = useCallback(() => setIsDragging(false), [])

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label htmlFor={name} className="text-white">
          {label}
        </Label>
        {prefersReducedMotion ? (
          <div className="bg-black border border-white/20 px-3 py-1 rounded-full flex items-center gap-1">
            <span className="text-lg font-medium" style={{ color: getColor() }}>
              {value}
            </span>
            <span className="text-gray-400 text-sm">{unit}</span>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: isDragging ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="bg-black border border-white/20 px-3 py-1 rounded-full flex items-center gap-1"
          >
            <span className="text-lg font-medium transition-colors" style={{ color: getColor() }}>
              {value}
            </span>
            <span className="text-gray-400 text-sm">{unit}</span>
          </motion.div>
        )}
      </div>

      <div
        className="relative pt-1 pb-6"
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        <Slider
          id={name}
          min={min}
          max={max}
          step={step}
          defaultValue={[defaultValue]}
          value={[value]}
          onValueChange={handleSliderChange}
          className="cursor-pointer"
        />

        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-500">{min}</span>
          <span className="text-xs text-gray-500">{max}</span>
        </div>

        {description && <p className="text-xs text-gray-400 mt-2 absolute bottom-0 left-0 right-0">{description}</p>}
      </div>
    </div>
  )
}
