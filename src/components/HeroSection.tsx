
import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import ButtonLink from "@/components/atoms/ButtonLink";
import { ChevronRight, Sparkles } from "lucide-react";
import ThreeDBackground from "./ThreeDBackground";

const HeroSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const titleRef = useRef(null);

  // Animated text split into characters
  const title = "CodeBird Club";
  const titleChars = Array.from(title);

  // Staggered character animation variants
  const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.05,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }
    })
  };

  const buttonVariants = {
    initial: { 
      opacity: 0, 
      y: 20 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        delay: 0.8 
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    }
  };

  // Mouse parallax effect for title
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!titleRef.current) return;
    
    const title = titleRef.current as HTMLElement;
    const rect = title.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    title.style.transform = `perspective(1000px) rotateX(${y * 0.01}deg) rotateY(${x * -0.01}deg)`;
  };

  // Reset transform on mouse leave
  const handleMouseLeave = () => {
    if (!titleRef.current) return;
    (titleRef.current as HTMLElement).style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            ref={titleRef}
            className="inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                THE{" "}
              </span>
              {titleChars.map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={charVariants}
                  initial="hidden"
                  animate="visible"
                  className="hero-letter inline-block transform transition-all hover:scale-110 cursor-default"
                >
                  {char === " " ? <span>&nbsp;</span> : char}
                </motion.span>
              ))}
            </h1>
          </motion.div>
          
          <motion.p 
            ref={ref}
            className="text-xl md:text-2xl mb-10 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.8,
                  delay: 0.6,
                  ease: "easeOut"
                }
              }
            }}
          >
            A community of developers, designers, and creators 
            <motion.span
              className="relative inline-block ml-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <span>pushing the boundaries of technology</span>
              <Sparkles className="absolute -top-5 -right-8 text-yellow-400 animate-pulse" size={20} />
            </motion.span>
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <motion.div variants={buttonVariants}>
              <ButtonLink 
                to="/join" 
                size="lg"
                rightIcon={<ChevronRight />}
                className="overflow-hidden group relative transition-all duration-300"
              >
                <span className="relative z-10">Join Now</span>
                <span className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </ButtonLink>
            </motion.div>
            
            <motion.div variants={buttonVariants}>
              <ButtonLink 
                to="/projects" 
                variant="outline" 
                size="lg"
                className="backdrop-blur-sm bg-background/30 border border-primary/20 hover:border-primary/80 transition-all duration-300"
              >
                Explore Projects
              </ButtonLink>
            </motion.div>
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
      
      {/* Floating badges that appear with delay */}
      <motion.div 
        className="absolute top-1/4 right-[10%] hidden lg:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="glass-card p-3 animate-float">
          <div className="text-sm font-semibold text-primary">Web3 Development</div>
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-1/4 left-[10%] hidden lg:block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <div className="glass-card p-3 animate-float" style={{ animationDelay: '1s' }}>
          <div className="text-sm font-semibold text-accent">AI Integration</div>
        </div>
      </motion.div>

      {/* Interactive particles at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none overflow-hidden">
        <div className="shimmer-particles"></div>
      </div>
    </section>
  );
};

export default HeroSection;
