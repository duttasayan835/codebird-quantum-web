
import React, { Suspense, useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import UpcomingEventsSection from "../components/UpcomingEventsSection";
import CtaSection from "../components/CtaSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedPage from "../components/AnimatedPage";
import ParticlesBackground from "../components/ParticlesBackground";
import FuturisticCursor from "../components/FuturisticCursor";
import FuturisticGrid from "../components/FuturisticGrid";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

// Use lazy loading for ThreeDBackground
const ThreeDBackground = React.lazy(() => 
  import("../components/ThreeDBackground")
    .then(module => ({ default: module.default }))
    .catch(() => ({
      default: () => <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-primary/5 to-background/80"></div>
    }))
);

const Index = () => {
  const { user } = useAuth();
  const [backgroundError, setBackgroundError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleBackgroundError = () => {
    console.error("Failed to load ThreeDBackground");
    setBackgroundError(true);
  };

  // Set loaded state after a slight delay for animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatedPage transitionType="fade">
      {/* Initial loading overlay */}
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 animate-pulse"
        >
          CodeBird Club
        </motion.div>
      </motion.div>
      
      {/* Custom cursor for desktop */}
      {isLoaded && <FuturisticCursor />}
      
      {/* Futuristic grid overlay */}
      {isLoaded && <FuturisticGrid />}

      {/* Animated background layers */}
      <Suspense fallback={<div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-primary/5 to-background/80"></div>}>
        {!backgroundError && (
          <ThreeDBackground onError={handleBackgroundError} />
        )}
      </Suspense>
      
      {/* Additional visual effects */}
      <div className="radial-animated-bg"></div>
      <ParticlesBackground />
      
      {/* Main content */}
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <HeroSection />
        <FeaturesSection />
        <UpcomingEventsSection />
        <CtaSection />
      </motion.main>
      <Footer />
    </AnimatedPage>
  );
};

export default Index;
