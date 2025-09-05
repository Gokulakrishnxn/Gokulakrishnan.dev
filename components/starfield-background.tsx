"use client"

import { useEffect, useRef } from "react"

export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Star properties
    const stars: Array<{
      x: number
      y: number
      size: number
      opacity: number
      twinkleSpeed: number
      twinkleOffset: number
    }> = []

    // Create stars
    const createStars = () => {
      const numStars = Math.floor((canvas.width * canvas.height) / 8000) // Density based on screen size

      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5, // Size between 0.5 and 2.5
          opacity: Math.random() * 0.8 + 0.2, // Opacity between 0.2 and 1
          twinkleSpeed: Math.random() * 0.02 + 0.005, // Twinkle speed
          twinkleOffset: Math.random() * Math.PI * 2, // Random starting phase
        })
      }
    }

    createStars()

    // Animation
    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.016 // Roughly 60fps

      // Clear canvas
      ctx.fillStyle = "rgb(15, 15, 23)" // Very dark background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7
        const currentOpacity = star.opacity * twinkle

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`
        ctx.fill()

        // Add a subtle glow for larger stars
        if (star.size > 1.5) {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.1})`
          ctx.fill()
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: "rgb(15, 15, 23)" }}
    />
  )
}
