"use client"

import { useEffect, useRef } from "react"

export function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const gridSize = 50
      const lineWidth = 0.5
      const opacity = 0.1
      
      // Set grid color
      ctx.strokeStyle = `rgba(148, 163, 184, ${opacity})`
      ctx.lineWidth = lineWidth
      
      // Draw vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      
      // Draw horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    const animate = () => {
      drawGrid()
      animationId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()

    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: "transparent" }}
    />
  )
}

export function AnimatedGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let time = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawAnimatedGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const gridSize = 60
      const lineWidth = 0.5
      const baseOpacity = 0.05
      const waveOpacity = 0.03
      
      time += 0.01
      
      // Draw vertical lines with wave effect
      for (let x = 0; x <= canvas.width; x += gridSize) {
        const wave = Math.sin(time + x * 0.01) * waveOpacity
        const opacity = baseOpacity + wave
        
        ctx.strokeStyle = `rgba(148, 163, 184, ${Math.max(0, opacity)})`
        ctx.lineWidth = lineWidth
        
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      
      // Draw horizontal lines with wave effect
      for (let y = 0; y <= canvas.height; y += gridSize) {
        const wave = Math.cos(time + y * 0.01) * waveOpacity
        const opacity = baseOpacity + wave
        
        ctx.strokeStyle = `rgba(148, 163, 184, ${Math.max(0, opacity)})`
        ctx.lineWidth = lineWidth
        
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    const animate = () => {
      drawAnimatedGrid()
      animationId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()

    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: "transparent" }}
    />
  )
}

export function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let time = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawDotGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const gridSize = 40
      const dotSize = 1
      const baseOpacity = 0.1
      const waveOpacity = 0.05
      
      time += 0.02
      
      for (let x = 0; x <= canvas.width; x += gridSize) {
        for (let y = 0; y <= canvas.height; y += gridSize) {
          const distance = Math.sqrt((x - canvas.width/2)**2 + (y - canvas.height/2)**2)
          const wave = Math.sin(time + distance * 0.01) * waveOpacity
          const opacity = baseOpacity + wave
          
          ctx.fillStyle = `rgba(148, 163, 184, ${Math.max(0, opacity)})`
          ctx.beginPath()
          ctx.arc(x, y, dotSize, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const animate = () => {
      drawDotGrid()
      animationId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()

    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: "transparent" }}
    />
  )
}

export function GradientGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let time = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawGradientGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const gridSize = 80
      const lineWidth = 0.5
      const baseOpacity = 0.08
      
      time += 0.005
      
      // Create gradient for each line
      for (let x = 0; x <= canvas.width; x += gridSize) {
        const gradient = ctx.createLinearGradient(x, 0, x, canvas.height)
        const opacity1 = baseOpacity + Math.sin(time + x * 0.01) * 0.02
        const opacity2 = baseOpacity + Math.sin(time + x * 0.01 + Math.PI) * 0.02
        
        gradient.addColorStop(0, `rgba(59, 130, 246, ${Math.max(0, opacity1)})`)
        gradient.addColorStop(0.5, `rgba(147, 51, 234, ${Math.max(0, baseOpacity)})`)
        gradient.addColorStop(1, `rgba(236, 72, 153, ${Math.max(0, opacity2)})`)
        
        ctx.strokeStyle = gradient
        ctx.lineWidth = lineWidth
        
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      
      for (let y = 0; y <= canvas.height; y += gridSize) {
        const gradient = ctx.createLinearGradient(0, y, canvas.width, y)
        const opacity1 = baseOpacity + Math.cos(time + y * 0.01) * 0.02
        const opacity2 = baseOpacity + Math.cos(time + y * 0.01 + Math.PI) * 0.02
        
        gradient.addColorStop(0, `rgba(59, 130, 246, ${Math.max(0, opacity1)})`)
        gradient.addColorStop(0.5, `rgba(147, 51, 234, ${Math.max(0, baseOpacity)})`)
        gradient.addColorStop(1, `rgba(236, 72, 153, ${Math.max(0, opacity2)})`)
        
        ctx.strokeStyle = gradient
        ctx.lineWidth = lineWidth
        
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    const animate = () => {
      drawGradientGrid()
      animationId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()

    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: "transparent" }}
    />
  )
}