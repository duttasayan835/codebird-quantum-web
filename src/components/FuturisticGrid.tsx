
import React, { useEffect, useRef } from 'react';

const FuturisticGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to match window
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    // Animation variables
    let time = 0;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const draw = () => {
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Grid settings
      const gridSize = 40;
      const gridLineWidth = 0.5;
      const gridLineColor = 'rgba(139, 92, 246, 0.1)';
      const gridAccentColor = 'rgba(6, 182, 212, 0.3)';
      
      // Draw grid
      ctx.strokeStyle = gridLineColor;
      ctx.lineWidth = gridLineWidth;
      
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Draw ripple effect from mouse position
      const rippleRadius = 300 + Math.sin(time * 2) * 50;
      const rippleWidth = 50;
      
      ctx.strokeStyle = gridAccentColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, rippleRadius, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, rippleRadius - rippleWidth, 0, Math.PI * 2);
      ctx.stroke();
      
      // Highlight grid cells near mouse
      const cellX = Math.floor(mouseX / gridSize);
      const cellY = Math.floor(mouseY / gridSize);
      const highlightRadius = 3; // Cells to highlight around mouse
      
      ctx.fillStyle = 'rgba(139, 92, 246, 0.05)';
      for (let x = cellX - highlightRadius; x <= cellX + highlightRadius; x++) {
        for (let y = cellY - highlightRadius; y <= cellY + highlightRadius; y++) {
          const distance = Math.sqrt(Math.pow(x - cellX, 2) + Math.pow(y - cellY, 2));
          if (distance <= highlightRadius) {
            const alpha = 0.1 * (1 - distance / highlightRadius);
            ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
          }
        }
      }
      
      // Update time
      time += 0.01;
      
      // Request next frame
      requestAnimationFrame(draw);
    };
    
    // Start animation loop
    const animationId = requestAnimationFrame(draw);
    
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-[-3] pointer-events-none opacity-60"
    />
  );
};

export default FuturisticGrid;
