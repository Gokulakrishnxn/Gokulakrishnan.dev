"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface PixelImageProps {
  src: string;
  customGrid?: { rows: number; cols: number };
  grayscaleAnimation?: boolean;
  className?: string;
  alt?: string;
}

export function PixelImage({
  src,
  customGrid = { rows: 4, cols: 6 },
  grayscaleAnimation = false,
  className,
  alt = "Pixelated image",
}: PixelImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationFrame, setAnimationFrame] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    
    if (!canvas || !image || !isLoaded) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use requestAnimationFrame for smoother rendering
    const render = () => {
      const { rows, cols } = customGrid;
      const cellWidth = canvas.width / cols;
      const cellHeight = canvas.height / rows;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw pixelated image
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * cellWidth;
          const y = row * cellHeight;
          
          // Get pixel color from center of each cell
          const centerX = x + cellWidth / 2;
          const centerY = y + cellHeight / 2;
          
          // Sample color from the image
          const imageData = ctx.getImageData(centerX, centerY, 1, 1);
          const [r, g, b, a] = imageData.data;
          
          if (a > 0) {
            let finalR = r;
            let finalG = g;
            let finalB = b;
            
            // Apply grayscale animation if enabled
            if (grayscaleAnimation) {
              const time = Date.now() * 0.001;
              const wave = Math.sin(time * 1.5 + row * 0.3 + col * 0.2) * 0.3 + 0.7; // Reduced intensity
              const grayscale = r * 0.299 + g * 0.587 + b * 0.114;
              finalR = r + (grayscale - r) * wave;
              finalG = g + (grayscale - g) * wave;
              finalB = b + (grayscale - b) * wave;
            }
            
            ctx.fillStyle = `rgb(${Math.round(finalR)}, ${Math.round(finalG)}, ${Math.round(finalB)})`;
            ctx.fillRect(x, y, cellWidth, cellHeight);
          }
        }
      }
    };

    if (grayscaleAnimation) {
      requestAnimationFrame(render);
    } else {
      render();
    }
  }, [isLoaded, customGrid, grayscaleAnimation, animationFrame]);

  // Animation loop for grayscale effect
  useEffect(() => {
    if (!grayscaleAnimation) return;
    
    const interval = setInterval(() => {
      setAnimationFrame(prev => prev + 1);
    }, 300); // Further reduced frequency for smoother performance
    
    return () => clearInterval(interval);
  }, [grayscaleAnimation]);

  const handleImageLoad = () => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    
    if (!canvas || !image) return;
    
    // Set canvas size to match image
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    
    // Draw the image first to get pixel data
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.drawImage(image, 0, 0);
    setIsLoaded(true);
  };

  return (
    <div className={cn("relative inline-block", className)}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="opacity-0 absolute"
        onLoad={handleImageLoad}
        loading="lazy"
        decoding="async"
      />
      <canvas
        ref={canvasRef}
        className="block max-w-full h-auto"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}
