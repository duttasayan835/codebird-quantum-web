
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const rect = heroRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      const elements = heroRef.current.querySelectorAll(".floating-element");
      
      elements.forEach((el, i) => {
        const htmlEl = el as HTMLElement;
        const depth = parseFloat(htmlEl.dataset.depth || "0.05");
        const translateX = (x - rect.width / 2) * depth;
        const translateY = (y - rect.height / 2) * depth;
        
        htmlEl.style.transform = `translate(${translateX}px, ${translateY}px)`;
      });
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  
  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-background via-background to-codebird-primary/5"></div>
      
      {/* Floating elements */}
      <div 
        className="floating-element absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-codebird-primary/10 blur-3xl" 
        data-depth="0.02"
      ></div>
      <div 
        className="floating-element absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-codebird-secondary/10 blur-3xl" 
        data-depth="0.03"
      ></div>
      <div 
        className="floating-element absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-codebird-accent/10 blur-3xl" 
        data-depth="0.04"
      ></div>
      
      {/* Tech elements */}
      <div 
        className="floating-element absolute top-[20%] left-[15%] w-20 h-20 glass-card flex items-center justify-center animate-float"
        data-depth="0.06"
      >
        <span className="text-4xl font-mono">{"{"}</span>
      </div>
      <div 
        className="floating-element absolute bottom-[25%] right-[15%] w-16 h-16 glass-card flex items-center justify-center animate-float"
        data-depth="0.07"
        style={{animationDelay: "-1s"}}
      >
        <span className="text-3xl font-mono">{"<>"}</span>
      </div>
      <div 
        className="floating-element absolute top-[60%] left-[25%] w-12 h-12 glass-card flex items-center justify-center animate-float"
        data-depth="0.08"
        style={{animationDelay: "-0.5s"}}
      >
        <span className="text-2xl font-mono">#</span>
      </div>
      <div 
        className="floating-element absolute top-[30%] right-[28%] w-14 h-14 glass-card flex items-center justify-center animate-float"
        data-depth="0.05"
        style={{animationDelay: "-1.5s"}}
      >
        <span className="text-2xl font-mono">()</span>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            <span className="text-gradient glow">THE Codebird Club</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-10 animate-fade-in" style={{animationDelay: "0.2s"}}>
            Where developers soar beyond limitations through community, innovation, and cutting-edge technology.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in" style={{animationDelay: "0.4s"}}>
            <Link
              to="/join"
              className="px-8 py-3 bg-primary hover:bg-primary/90 rounded-full text-white transition-all shadow-lg hover:shadow-primary/40 text-lg flex items-center gap-2"
            >
              Join the Club <ArrowRight size={18} />
            </Link>
            <Link
              to="/projects"
              className="px-8 py-3 glass-card hover:bg-white/10 rounded-full transition-all text-lg"
            >
              Explore Projects
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-foreground/50 rounded-full mt-2 animate-[bounce_1.5s_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
