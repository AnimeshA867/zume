"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

interface DotBackgroundProps {
  children?: React.ReactNode
  className?: string
}

export function DotBackground({ children, className = "" }: DotBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current?.parentElement) {
        const { width, height } = canvasRef.current.parentElement.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dot properties
    const dotSize = 1.5
    const spacing = 25
    const dotColor = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"
    const accentColor = isDark ? "rgba(79, 70, 229, 0.6)" : "rgba(79, 70, 229, 0.4)"

    // Draw dots
    for (let x = spacing; x < canvas.width; x += spacing) {
      for (let y = spacing; y < canvas.height; y += spacing) {
        // Add some randomness to dot positions
        const offsetX = Math.random() * 4 - 2
        const offsetY = Math.random() * 4 - 2

        // Determine if this should be an accent dot (1 in 20 chance)
        const isAccent = Math.random() < 0.05

        ctx.beginPath()
        ctx.arc(x + offsetX, y + offsetY, isAccent ? dotSize * 1.5 : dotSize, 0, Math.PI * 2)
        ctx.fillStyle = isAccent ? accentColor : dotColor
        ctx.fill()
      }
    }
  }, [dimensions, isDark])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ pointerEvents: "none" }} />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
