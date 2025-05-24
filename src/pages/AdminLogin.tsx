
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AnimatedPage from "@/components/AnimatedPage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Mail, Lock, Github, AlertCircle, Loader2, Shield, Eye, EyeOff } from "lucide-react";
import Button from "@/components/atoms/Button";
import TextField from "@/components/atoms/TextField";

// Quantum Particle System
const QuantumParticleSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      hue: number;
      energy: number;
      orbit: number;
    }> = [];
    
    // Create quantum particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        hue: 240 + Math.random() * 60,
        energy: Math.random(),
        orbit: Math.random() * Math.PI * 2
      });
    }
    
    let frame = 0;
    
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      frame += 0.01;
      
      particles.forEach((particle, i) => {
        // Orbital motion around center
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const distance = Math.sqrt(Math.pow(particle.x - centerX, 2) + Math.pow(particle.y - centerY, 2));
        
        // Quantum tunneling effect
        if (Math.random() < 0.001) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
        }
        
        // Update position with orbital influence
        particle.orbit += 0.02;
        particle.x += particle.vx + Math.cos(particle.orbit) * 0.5;
        particle.y += particle.vy + Math.sin(particle.orbit) * 0.5;
        
        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle with quantum glow
        const alpha = 0.6 + Math.sin(frame + i * 0.1) * 0.4;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        // Create radial gradient for glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 60%, ${alpha})`);
        gradient.addColorStop(0.5, `hsla(${particle.hue}, 100%, 50%, ${alpha * 0.5})`);
        gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 40%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Quantum entanglement lines
        particles.forEach((other, j) => {
          if (i !== j) {
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
              ctx.beginPath();
              ctx.strokeStyle = `hsla(${(particle.hue + other.hue) / 2}, 100%, 50%, ${0.3 * (1 - distance / 150)})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
            }
          }
        });
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ background: 'radial-gradient(ellipse at center, #1a0b2e 0%, #16213e 50%, #0f3460 100%)' }}
    />
  );
};

// Cyberpunk Circuit Pattern
const CyberCircuitOverlay = () => (
  <div className="absolute inset-0 z-10 opacity-20 pointer-events-none">
    <svg className="w-full h-full" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f5ff" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#f0abfc" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <motion.path
        d="M50,100 L200,100 L250,150 L400,150 L450,200 L600,200 L650,250 L800,250"
        stroke="url(#circuitGradient)"
        strokeWidth="2"
        fill="none"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      />
      
      <motion.path
        d="M100,300 L300,300 L350,350 L550,350 L600,400 L800,400"
        stroke="url(#circuitGradient)"
        strokeWidth="2"
        fill="none"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
      />
      
      <motion.path
        d="M150,500 L350,500 L400,550 L600,550 L650,600 L850,600"
        stroke="url(#circuitGradient)"
        strokeWidth="2"
        fill="none"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", delay: 2 }}
      />
    </svg>
  </div>
);

// Quantum Cursor Tracker
const QuantumCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    
    const handleMouseLeave = () => setVisible(false);
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      animate={{
        x: position.x - 20,
        y: position.y - 20,
        opacity: visible ? 1 : 0
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    >
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 blur-sm opacity-70" />
      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
    </motion.div>
  );
};

// Morphing Input Field Component
const QuantumInput = ({ 
  label, 
  type, 
  icon, 
  value, 
  onChange, 
  required = true,
  name
}: { 
  label: string; 
  type: string; 
  icon: React.ReactNode; 
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  name: string;
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <motion.div 
      className="relative mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-sm"
          animate={{
            opacity: focused ? 1 : 0,
            scale: focused ? 1.02 : 1
          }}
          transition={{ duration: 0.3 }}
        />
        
        <div className="relative backdrop-blur-xl bg-black/30 border border-white/20 rounded-xl overflow-hidden">
          <div className="flex items-center p-4">
            <motion.div 
              className="mr-3 text-cyan-400"
              animate={{ 
                rotate: focused ? 360 : 0,
                scale: focused ? 1.1 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.div>
            
            <div className="flex-1">
              <motion.label
                className={`absolute transition-all duration-300 ${
                  focused || value ? 'text-xs -top-2 left-2 text-cyan-400' : 'text-white/70 top-1/2 left-0 transform -translate-y-1/2'
                }`}
                animate={{
                  y: focused || value ? -10 : 0,
                  scale: focused || value ? 0.8 : 1,
                  color: focused ? '#00f5ff' : '#ffffff70'
                }}
              >
                {label}
              </motion.label>
              
              <input
                type={type === 'password' && showPassword ? 'text' : type}
                name={name}
                value={value}
                onChange={onChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                required={required}
                className="w-full bg-transparent text-white placeholder-transparent focus:outline-none mt-2"
              />
            </div>
            
            {type === 'password' && (
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-white/50 hover:text-cyan-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </motion.button>
            )}
          </div>
          
          <motion.div 
            className="h-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
            animate={{
              scaleX: focused ? 1 : 0,
              opacity: focused ? 1 : 0.3
            }}
            transition={{ duration: 0.3 }}
            style={{ transformOrigin: 'left' }}
          />
        </div>
      </div>
    </motion.div>
  );
};

// Holographic Login Card
const HolographicCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    className={`relative ${className}`}
    whileHover={{ 
      rotateX: 5,
      rotateY: 5,
      scale: 1.02
    }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    style={{ transformStyle: "preserve-3d" }}
  >
    {/* Holographic background layers */}
    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl opacity-30 blur-lg animate-pulse" />
    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-2xl opacity-40 blur-md" />
    
    {/* Main card */}
    <div className="relative backdrop-blur-xl bg-black/40 border border-white/20 rounded-2xl overflow-hidden">
      {/* Animated border flow */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0, 245, 255, 0.5), transparent)',
          backgroundSize: '200% 100%'
        }}
        animate={{
          backgroundPosition: ['0% 0%', '200% 0%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  </motion.div>
);

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate quantum authentication
    setTimeout(() => {
      if (credentials.email === "admin@codebirdclub.com" && credentials.password === "admin") {
        localStorage.setItem("adminAuthenticated", "true");
        toast({
          title: "🔮 Quantum Access Granted",
          description: "Neural pathways synchronized. Welcome to the admin matrix.",
        });
        navigate("/admin");
      } else {
        toast({
          title: "⚡ Access Denied",
          description: "Quantum signature mismatch detected. Please verify your credentials.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 2000);
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setCredentials({ email: "", password: "" });
  };

  return (
    <AnimatedPage>
      <Navbar />
      <QuantumCursor />
      
      <main className="min-h-screen relative overflow-hidden">
        {/* Quantum Background */}
        <QuantumParticleSystem />
        <CyberCircuitOverlay />
        
        {/* Portal Gateway Effect */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,245,255,0.1) 0%, rgba(139,92,246,0.1) 50%, transparent 100%)',
            transform: 'translate(-50%, -50%)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="container mx-auto px-4 py-20 relative z-20 flex items-center justify-center min-h-screen">
          <div className="max-w-md mx-auto w-full">
            {/* Quantum Logo */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, type: "spring" }}
            >
              <motion.div
                className="inline-block p-6 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-xl mb-4"
                animate={{
                  rotateY: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Shield className="w-12 h-12 text-cyan-400" />
              </motion.div>
              
              <motion.h1
                className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                Quantum Admin Portal
              </motion.h1>
              
              <motion.p
                className="text-white/70 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Neural authentication interface
              </motion.p>
            </motion.div>

            {/* Holographic Auth Card */}
            <HolographicCard>
              <div className="p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isSignup ? 'signup' : 'login'}
                    initial={{ opacity: 0, rotateY: -90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 90 }}
                    transition={{ duration: 0.5, type: "spring" }}
                  >
                    {/* Form Toggle */}
                    <div className="flex mb-6 bg-black/30 rounded-xl p-1">
                      <motion.button
                        type="button"
                        onClick={() => !isSignup && toggleForm()}
                        className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                          !isSignup 
                            ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white' 
                            : 'text-white/70 hover:text-white'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Neural Login
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={() => isSignup && toggleForm()}
                        className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                          isSignup 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                            : 'text-white/70 hover:text-white'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Quantum Register
                      </motion.button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {isSignup && (
                        <QuantumInput
                          label="Admin Access Code"
                          type="text"
                          icon={<AlertCircle className="h-4 w-4" />}
                          value=""
                          onChange={() => {}}
                          name="accessCode"
                        />
                      )}
                      
                      <QuantumInput
                        label="Digital ID"
                        type="email"
                        icon={<Mail className="h-4 w-4" />}
                        value={credentials.email}
                        onChange={handleChange}
                        name="email"
                      />
                      
                      <QuantumInput
                        label="Neural Passkey"
                        type="password"
                        icon={<Lock className="h-4 w-4" />}
                        value={credentials.password}
                        onChange={handleChange}
                        name="password"
                      />

                      {/* Quantum Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        className="w-full relative overflow-hidden group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl" />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-xl opacity-0 group-hover:opacity-100"
                          transition={{ duration: 0.3 }}
                        />
                        
                        <div className="relative backdrop-blur-xl bg-black/20 m-0.5 rounded-lg py-4 px-6 flex items-center justify-center">
                          {isLoading ? (
                            <motion.div
                              className="flex items-center gap-2"
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              <Loader2 className="animate-spin" size={20} />
                              <span>Quantum sync...</span>
                            </motion.div>
                          ) : (
                            <span className="font-medium">
                              {isSignup ? "Initialize Matrix" : "Enter Quantum Realm"}
                            </span>
                          )}
                        </div>
                        
                        {/* Ripple effect */}
                        <motion.div
                          className="absolute inset-0 bg-white/20 rounded-xl"
                          initial={{ scale: 0, opacity: 1 }}
                          animate={{ scale: 4, opacity: 0 }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                        />
                      </motion.button>
                    </form>

                    {/* Social Auth */}
                    <div className="mt-6">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-white/20" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                          <span className="bg-transparent px-2 text-white/60">Neural bridge protocols</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <motion.button
                          type="button"
                          className="relative overflow-hidden backdrop-blur-xl bg-black/30 border border-white/20 rounded-lg py-3 px-4 hover:bg-white/10 transition-all group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          disabled
                        >
                          <div className="flex items-center justify-center gap-2">
                            <Github size={18} />
                            <span className="text-sm">GitHub</span>
                          </div>
                        </motion.button>
                        
                        <motion.button
                          type="button"
                          className="relative overflow-hidden backdrop-blur-xl bg-black/30 border border-white/20 rounded-lg py-3 px-4 hover:bg-white/10 transition-all group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          disabled
                        >
                          <div className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="text-sm">Google</span>
                          </div>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Animated Bottom Border */}
              <motion.div
                className="h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </HolographicCard>

            {/* Demo Credentials */}
            <motion.div
              className="mt-6 text-center text-sm text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p className="mb-1">🔮 Demo Quantum Credentials:</p>
              <p>Email: admin@codebirdclub.com</p>
              <p>Password: admin</p>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </AnimatedPage>
  );
};

export default AdminLogin;
