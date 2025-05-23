
import React, { useState, useEffect } from 'react';

const FuturisticCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [trailDots, setTrailDots] = useState<{ x: number, y: number, alpha: number }[]>([]);

  useEffect(() => {
    const addTrailDot = (x: number, y: number) => {
      setTrailDots(prevDots => {
        const newDots = [...prevDots, { x, y, alpha: 1 }];
        // Keep only the last 20 dots
        if (newDots.length > 20) {
          return newDots.slice(newDots.length - 20);
        }
        return newDots;
      });
    };

    const fadeTrailDots = () => {
      setTrailDots(prevDots => 
        prevDots.map(dot => ({
          ...dot,
          alpha: dot.alpha > 0 ? dot.alpha - 0.03 : 0
        })).filter(dot => dot.alpha > 0)
      );
    };

    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
      
      // Add a new trail dot only on certain frames to avoid too many dots
      if (Math.random() > 0.6) {
        addTrailDot(e.clientX, e.clientY);
      }
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    const handleMouseLeave = () => setVisible(false);
    
    // Check if cursor is over interactive elements
    const handleElementsChange = () => {
      const hoveredElement = document.querySelectorAll(':hover');
      const isOverLink = Array.from(hoveredElement).some(el => {
        const tagName = (el as HTMLElement).tagName.toLowerCase();
        return tagName === 'a' || tagName === 'button' || 
               (el as HTMLElement).getAttribute('role') === 'button';
      });
      
      setLinkHovered(isOverLink);
    };

    // Set up interval for fading out trail dots
    const fadeInterval = setInterval(fadeTrailDots, 30);

    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleElementsChange);

    return () => {
      clearInterval(fadeInterval);
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleElementsChange);
    };
  }, []);

  // Determine cursor styles based on state
  const cursorSize = linkHovered ? 40 : 20;
  const cursorStyle: React.CSSProperties = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: `${cursorSize}px`,
    height: `${cursorSize}px`,
    opacity: visible ? 1 : 0,
    transform: `translate(-50%, -50%) scale(${clicked ? 0.8 : 1})`,
    mixBlendMode: linkHovered ? 'difference' : 'normal' as React.CSSProperties['mixBlendMode'],
    backgroundColor: linkHovered 
      ? 'rgb(255, 255, 255)' 
      : 'rgba(139, 92, 246, 0.4)',
    border: linkHovered 
      ? 'none' 
      : '1px solid rgba(139, 92, 246, 0.8)',
    filter: `blur(${linkHovered ? 0 : 2}px)`,
    boxShadow: linkHovered 
      ? '0 0 0 2px rgba(255, 255, 255, 0.3)' 
      : '0 0 10px rgba(139, 92, 246, 0.5)'
  };

  return (
    <>
      {/* Main cursor dot */}
      <div 
        className="cursor-dot cursor-dot-outline"
        style={cursorStyle}
      />
      
      {/* Smaller inner cursor dot */}
      <div 
        className="cursor-dot cursor-dot-inner"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: visible ? 1 : 0,
        }}
      />
      
      {/* Trail dots */}
      {trailDots.map((dot, index) => (
        <div
          key={index}
          className="cursor-dot"
          style={{
            width: '4px',
            height: '4px',
            left: `${dot.x}px`,
            top: `${dot.y}px`,
            opacity: dot.alpha,
            backgroundColor: 'rgba(139, 92, 246, 0.5)',
            boxShadow: '0 0 5px rgba(139, 92, 246, 0.3)',
          }}
        />
      ))}
      
      {/* Hide default cursor */}
      <style>
        {`
        * {
          cursor: none !important;
        }
        
        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
          .cursor-dot {
            display: none !important;
          }
        }
        `}
      </style>
    </>
  );
};

export default FuturisticCursor;
