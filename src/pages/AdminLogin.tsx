
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AnimatedPage from "@/components/AnimatedPage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { Mail, Lock, Github, AlertCircle, Loader2 } from "lucide-react";
import Button from "@/components/atoms/Button";
import TextField from "@/components/atoms/TextField";

// Cyberpunk circuit pattern SVG background
const CyberCircuitPattern = () => (
  <div className="absolute inset-0 z-0 opacity-10">
    <svg 
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 800 800"
    >
      <path 
        d="M0 0h800v800H0z" 
        fill="none" 
      />
      <path 
        d="M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63"
        fill="none"
        stroke="#4F46E5"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path 
        d="M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764"
        fill="none"
        stroke="#06B6D4"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path 
        d="M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880"
        fill="none"
        stroke="#8B5CF6"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

// Floating particle that follows cursor
const QuantumParticle = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const particleRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Add delay for trailing effect
      setTimeout(() => {
        if (particleRef.current) {
          const x = e.clientX;
          const y = e.clientY;
          setPosition({ x, y });
        }
      }, 100);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  return (
    <motion.div 
      ref={particleRef}
      className="fixed w-8 h-8 pointer-events-none z-50"
      animate={{ 
        x: position.x - 16, 
        y: position.y - 16,
        opacity: [0.5, 0.8, 0.5],
        scale: [1, 1.1, 1]
      }}
      transition={{ 
        type: "spring", 
        stiffness: 120, 
        damping: 20,
        opacity: { 
          repeat: Infinity, 
          duration: 2 
        },
        scale: { 
          repeat: Infinity, 
          duration: 2 
        }
      }}
    >
      <div className="w-full h-full rounded-full bg-gradient-to-r from-primary via-accent to-secondary blur-md"></div>
    </motion.div>
  );
};

// Form field with cyberpunk aesthetics
const CyberFormField = ({ 
  label, 
  type, 
  icon, 
  value, 
  onChange, 
  required = true 
}: { 
  label: string; 
  type: string; 
  icon: React.ReactNode; 
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) => {
  return (
    <motion.div 
      className="mb-6 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <TextField
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        leftElement={icon}
        fullWidth
        className="bg-black/30 border-white/10 backdrop-blur-md focus:border-primary/70 focus:ring-primary/30 transition-all duration-300"
      />
      <motion.div 
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary via-accent to-primary rounded"
        initial={{ width: "0%" }}
        animate={{ width: value ? "100%" : "0%" }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

const AdminLogin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
    
    // Simulate authentication
    setTimeout(() => {
      if (credentials.email === "admin@codebirdclub.com" && credentials.password === "admin") {
        setIsAuthenticated(true);
        localStorage.setItem("adminAuthenticated", "true");
        toast({
          title: "Access Granted",
          description: "Welcome to the quantum admin interface.",
        });
        navigate("/admin");
      } else {
        toast({
          title: "Access Denied",
          description: "Invalid biometric signature detected.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 2000);
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  return (
    <AnimatedPage>
      <Navbar />
      <main className="pt-20 min-h-screen relative overflow-hidden">
        {/* Background elements */}
        <ParticlesBackground />
        <CyberCircuitPattern />
        <QuantumParticle />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-md mx-auto">
            {/* Animated Card */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
            >
              {/* Glow effects */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-xl opacity-30 blur-lg animate-pulse"></div>
              <div className="absolute -inset-0 bg-gradient-to-r from-primary via-accent to-secondary rounded-xl opacity-20 animate-glow"></div>
              
              {/* Card Content */}
              <Card className="backdrop-blur-xl bg-black/40 border border-white/10 overflow-hidden relative z-10">
                <div className="p-8">
                  <div className="mb-6 text-center">
                    <motion.div 
                      className="inline-block rounded-full p-3 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-md mb-4"
                      animate={{ 
                        rotateZ: [0, 10, 0, -10, 0],
                      }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 5,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="bg-gradient-to-r from-primary to-secondary rounded-full p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                          <path d="m15 9-6 6"></path>
                          <path d="m9 9 6 6"></path>
                        </svg>
                      </div>
                    </motion.div>
                    <motion.h1 
                      className="text-2xl font-bold mb-1"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {isSignup ? "Create Admin Access" : "Quantum Access Portal"}
                    </motion.h1>
                    <motion.p 
                      className="text-sm text-foreground/70"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {isSignup ? "Initialize new admin biometrics" : "Authenticate your digital signature"}
                    </motion.p>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.form 
                      key={isSignup ? "signup" : "login"}
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0, x: isSignup ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: isSignup ? 20 : -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {isSignup && (
                        <CyberFormField 
                          label="Admin Code"
                          type="text"
                          icon={<AlertCircle className="h-4 w-4" />}
                          value=""
                          onChange={() => {}}
                        />
                      )}
                      
                      <CyberFormField 
                        label="Digital ID"
                        type="email"
                        icon={<Mail className="h-4 w-4" />}
                        value={credentials.email}
                        onChange={(e) => handleChange(e)}
                      />
                      
                      <CyberFormField 
                        label="Neural Passkey"
                        type="password"
                        icon={<Lock className="h-4 w-4" />}
                        value={credentials.password}
                        onChange={(e) => handleChange(e)}
                      />

                      <motion.div 
                        className="pt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Button 
                          type="submit"
                          className="w-full bg-gradient-to-r from-primary via-accent to-secondary text-white border-0 h-12"
                          leftIcon={isLoading ? <Loader2 className="animate-spin" /> : undefined}
                          isLoading={isLoading}
                          loadingText="Authenticating..."
                        >
                          {isSignup ? "Initialize Access" : "Authenticate"}
                        </Button>
                      </motion.div>
                      
                      <div className="flex items-center justify-center gap-4 mt-6">
                        <hr className="flex-grow border-t border-white/10" />
                        <span className="text-xs text-foreground/60">or continue with</span>
                        <hr className="flex-grow border-t border-white/10" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <Button 
                          variant="outline"
                          className="h-12 backdrop-blur-md bg-white/5 hover:bg-white/10 border-white/10 transition-all duration-300"
                          disabled
                        >
                          <svg width="20" height="20" fill="currentColor" className="mr-2">
                            <path d="M15.545 6.558a9.42 9.42 0 0 0 .139 1.626c2.188-.546 3.086-1.7 3.086-1.7.21.636.2 1.25-.031 1.846 1.243-1.08 1.3-2.804.874-3.977a.52.52 0 0 0-.595-.329h-.006l-3.467.941zm-2.707.945a.5.5 0 0 0-.834-.334l-.874 1.091a.5.5 0 0 0 .122.778l.96.493a7.584 7.584 0 0 0-.245-.02zm-8.364.59a.5.5 0 0 0 .532-.744l-.854-1.105a.5.5 0 0 0-.764.034l-.302.396a7.496 7.496 0 0 0 1.388 1.419zm5.252-5.059l.253-2.528a.5.5 0 0 0-.4-.479l-2.2-.437a.5.5 0 0 0-.581.54l.125 1.253a7.465 7.465 0 0 0 2.803 1.651zm-2.973 5.22l2.92-2.919a.5.5 0 0 0 0-.707l-2.92-2.92a.5.5 0 1 0-.707.707L8.323 5.5l-2.96 2.96a.5.5 0 0 0 .707.707l2.96-2.96a.5.5 0 0 0 0-.707l-2.96-2.96a.5.5 0 1 0-.707.707l2.96 2.96-2.96 2.96a.5.5 0 0 0 .707.707l2.96-2.96z" />
                          </svg>
                          GitHub
                        </Button>
                        <Button 
                          variant="outline"
                          className="h-12 backdrop-blur-md bg-white/5 hover:bg-white/10 border-white/10 transition-all duration-300"
                          disabled
                        >
                          <svg
                            className="mr-2 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M1.42 6.357l3.244 1.946c.307-1.075.652-2.057 1.03-2.942m16.886 0A12.09 12.09 0 0 1 24 9a12.09 12.09 0 0 1-1.42 5.639l-3.244-1.946a7.16 7.16 0 0 0 .844-3.693 7.16 7.16 0 0 0-.844-3.693M3 9a6 6 0 0 0 6 6v-3H5.4A1.4 1.4 0 0 1 4 10.6V7.4A1.4 1.4 0 0 1 5.4 6H9V3a6 6 0 0 0-6 6m18 0a6 6 0 0 0-6-6v3h3.6A1.4 1.4 0 0 1 20 7.4v3.2a1.4 1.4 0 0 1-1.4 1.4H15v3a6 6 0 0 0 6-6" />
                          </svg>
                          Google
                        </Button>
                      </div>
                    </motion.form>
                  </AnimatePresence>

                  <div className="mt-6 text-center">
                    <button 
                      onClick={toggleForm}
                      className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                    >
                      {isSignup ? "Already have access? Authenticate" : "Need access? Initialize new credentials"}
                    </button>
                  </div>
                </div>
                
                {/* Animated border bottom */}
                <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-secondary overflow-hidden">
                  <motion.div
                    className="h-full w-20 bg-white/70 blur-sm"
                    animate={{ 
                      x: [-80, 400],
                    }}
                    transition={{ 
                      repeat: Infinity,
                      duration: 2,
                      ease: "linear"
                    }}
                  />
                </div>
              </Card>
            </motion.div>

            <div className="mt-6 text-center text-sm text-foreground/60">
              <p>Demo credentials:</p>
              <p>Email: admin@codebirdclub.com</p>
              <p>Password: admin</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </AnimatedPage>
  );
};

export default AdminLogin;
