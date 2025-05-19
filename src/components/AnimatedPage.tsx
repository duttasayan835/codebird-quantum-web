
import React, { useEffect } from "react";
import { motion } from "framer-motion";

interface AnimatedPageProps {
  children: React.ReactNode;
  transitionType?: "fade" | "slide" | "zoom" | "wave" | "none";
}

const pageVariants = {
  fade: {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  },
  slide: {
    initial: {
      opacity: 0,
      x: 100,
    },
    in: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: -100,
    },
  },
  zoom: {
    initial: {
      opacity: 0,
      scale: 0.9,
    },
    in: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 1.1,
    },
  },
  wave: {
    initial: {
      opacity: 0,
      y: 20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    in: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.07,
        staggerDirection: 1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  },
  none: {
    initial: {},
    in: {},
    exit: {},
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const AnimatedPage: React.FC<AnimatedPageProps> = ({ 
  children, 
  transitionType = "fade" 
}) => {
  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo(0, 0);
    
    // Apply WebGPU shader effects if available
    const applyShaderEffects = async () => {
      try {
        // Check if WebGPU is available
        if ("gpu" in navigator) {
          // This code would apply WebGPU shader effects
          // Since WebGPU is still experimental, we're just logging support
          console.log("WebGPU is supported in this browser");
        }
      } catch (error) {
        console.log("WebGPU is not supported or encountered an error");
      }
    };
    
    applyShaderEffects();
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="exit"
      variants={pageVariants[transitionType]}
      transition={pageTransition}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
