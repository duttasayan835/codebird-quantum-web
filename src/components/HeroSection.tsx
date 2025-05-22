
import React from "react";
import { motion } from "framer-motion";
import ButtonLink from "@/components/atoms/ButtonLink";
import { ChevronRight } from "lucide-react";
import ThreeDBackground from "./ThreeDBackground";

const HeroSection = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            THE CodeBird Club
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-10 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A community of developers, designers, and creators pushing the boundaries of technology
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ButtonLink 
              to="/join" 
              size="lg"
              rightIcon={<ChevronRight />}
            >
              Join Now
            </ButtonLink>
            <ButtonLink 
              to="/projects" 
              variant="outline" 
              size="lg"
            >
              Explore Projects
            </ButtonLink>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background z-10"></div>
        <ThreeDBackground />
      </motion.div>
    </section>
  );
};

export default HeroSection;
