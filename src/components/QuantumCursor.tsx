
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuantumCursorProps {
  color?: string;
  trailLength?: number;
  morphState?: "default" | "pointer" | "text" | "link" | "grab";
}

const QuantumCursor: React.FC<QuantumCursorProps> = ({
  color = "#8B5CF6",
  trailLength = 8,
  morphState = "default",
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [trailPositions, setTrailPositions] = useState<{ x: number; y: number }[]>([]);
  const [isOverLink, setIsOverLink] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);

  // Update cursor position based on mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);

      // Update trail positions
      setTrailPositions(prev => {
        const newPositions = [...prev];
        newPositions.unshift({ x: e.clientX, y: e.clientY });
        return newPositions.slice(0, trailLength);
      });

      // Check if mouse is over a link
      const target = e.target as HTMLElement;
      const isLink = target.tagName === 'A' || 
                     target.tagName === 'BUTTON' || 
                     target.closest('a') || 
                     target.closest('button');
      setIsOverLink(Boolean(isLink));
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [trailLength]);

  // Determine cursor state and appearance
  const cursorSize = isOverLink ? 40 : 20;
  const cursorScale = isClicking ? 0.8 : 1;

  const getCursorShape = () => {
    switch (morphState || (isOverLink ? 'link' : 'default')) {
      case 'pointer':
      case 'link':
        return 'rounded-full mix-blend-difference scale-125';
      case 'text':
        return 'w-[3px] h-[24px] bg-white';
      case 'grab':
        return 'rounded-full scale-110 border-2 border-white bg-transparent';
      default:
        return 'rounded-full mix-blend-difference';
    }
  };

  if (typeof window === 'undefined') {
    return null; // Don't render on server side
  }

  return (
    <>
      <motion.div
        ref={cursorRef}
        className={cn(
          "quantum-cursor fixed pointer-events-none z-[9999]",
          getCursorShape(),
          !visible && "opacity-0"
        )}
        animate={{
          x: position.x - cursorSize / 2,
          y: position.y - cursorSize / 2,
          scale: cursorScale,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 150,
          mass: 0.1,
        }}
        style={{
          width: cursorSize,
          height: cursorSize,
          backgroundColor: color,
        }}
      />

      {/* Cursor trail effect */}
      {trailPositions.map((pos, i) => (
        <motion.div
          key={i}
          className="quantum-cursor-trail fixed pointer-events-none z-[9998] rounded-full bg-primary/30"
          style={{
            position: 'absolute',
            left: pos.x - 5,
            top: pos.y - 5,
            width: 10,
            height: 10,
            opacity: 1 - i / trailLength,
            transform: `scale(${1 - i / (trailLength * 1.5)})`,
          }}
        />
      ))}

      {/* Magnetic elements effect - this is handled via CSS in particles.css */}
      <style>
        {`
        /* Add magnetic effect to buttons and links */
        a, button, .magnetic-element {
          transition: transform 0.2s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        /* Add chromatic feedback on hover */
        a:hover, button:hover, .magnetic-element:hover {
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.5);
        }
        `}
      </style>
    </>
  );
};

export default QuantumCursor;
