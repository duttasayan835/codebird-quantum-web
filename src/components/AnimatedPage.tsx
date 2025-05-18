
import React, { useEffect } from "react";
import { motion } from "framer-motion";

interface AnimatedPageProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const AnimatedPage: React.FC<AnimatedPageProps> = ({ children }) => {
  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
