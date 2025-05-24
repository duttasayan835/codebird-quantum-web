import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedPage from "../components/AnimatedPage";
import { useToast } from "@/components/ui/use-toast";
import { 
  LayoutDashboard, 
  Calendar, 
  FolderOpen, 
  BookOpen, 
  Image, 
  Users, 
  LogOut, 
  Activity, 
  Upload, 
  PlusSquare, 
  Search, 
  RotateCw,
  Bell,
  Settings,
  ChevronRight,
  AlertCircle,
  Cpu,
  Database,
  Globe,
  Zap,
  Shield,
  TrendingUp,
  Eye,
  Download,
  Star
} from "lucide-react";
import { Card } from "@/components/ui/card";
import Button from "@/components/atoms/Button";

// 3D Holographic Background
const HolographicBackground = () => {
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
      z: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
      hue: number;
      connections: number[];
    }> = [];
    
    // Create 3D particle network
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        vz: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        hue: 180 + Math.random() * 120,
        connections: []
      });
    }
    
    let frame = 0;
    
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      frame += 0.01;
      
      particles.forEach((particle, i) => {
        // Update 3D position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;
        
        // Wrap boundaries
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.z < 0) particle.z = 1000;
        if (particle.z > 1000) particle.z = 0;
        
        // Calculate 2D projection
        const scale = 500 / (500 + particle.z);
        const x2d = particle.x * scale;
        const y2d = particle.y * scale;
        const size2d = particle.size * scale;
        
        // Draw particle with depth-based opacity
        const alpha = Math.max(0.1, 1 - particle.z / 1000);
        ctx.beginPath();
        ctx.arc(x2d, y2d, size2d, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(
          x2d, y2d, 0,
          x2d, y2d, size2d * 4
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 80%, 60%, ${alpha})`);
        gradient.addColorStop(1, `hsla(${particle.hue}, 80%, 30%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Neural network connections
        particles.forEach((other, j) => {
          if (i !== j) {
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const dz = particle.z - other.z;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
            
            if (distance < 200) {
              const otherScale = 500 / (500 + other.z);
              const otherX2d = other.x * otherScale;
              const otherY2d = other.y * otherScale;
              
              ctx.beginPath();
              ctx.strokeStyle = `hsla(${(particle.hue + other.hue) / 2}, 70%, 50%, ${0.2 * (1 - distance / 200) * alpha})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(x2d, y2d);
              ctx.lineTo(otherX2d, otherY2d);
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
      style={{ 
        background: 'radial-gradient(ellipse at center, #0a0a23 0%, #1a0b2e 50%, #16213e 100%)' 
      }}
    />
  );
};

// Quantum Data Visualization
const QuantumDataViz = () => {
  const [dataPoints, setDataPoints] = useState<number[]>([]);
  
  useEffect(() => {
    const generateData = () => {
      const points = Array.from({ length: 20 }, () => Math.random() * 100);
      setDataPoints(points);
    };
    
    generateData();
    const interval = setInterval(generateData, 3000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative h-32 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 400 120">
        <defs>
          <linearGradient id="dataGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f0abfc" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        
        <motion.path
          d={`M 0,${120 - dataPoints[0]} ${dataPoints.map((point, i) => `L ${i * 20},${120 - point}`).join(' ')}`}
          stroke="url(#dataGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        <motion.path
          d={`M 0,${120 - dataPoints[0]} ${dataPoints.map((point, i) => `L ${i * 20},${120 - point}`).join(' ')} L 400,120 L 0,120 Z`}
          fill="url(#dataGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
        
        {dataPoints.map((point, i) => (
          <motion.circle
            key={i}
            cx={i * 20}
            cy={120 - point}
            r="3"
            fill="#00f5ff"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
          />
        ))}
      </svg>
    </div>
  );
};

// Holographic Card Component
const HolographicCard = ({ 
  children, 
  className = "",
  glowColor = "cyan"
}: { 
  children: React.ReactNode; 
  className?: string;
  glowColor?: string;
}) => (
  <motion.div
    className={`relative ${className}`}
    whileHover={{ 
      scale: 1.02,
      rotateX: 2,
      rotateY: 2
    }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    style={{ transformStyle: "preserve-3d" }}
  >
    <div className={`absolute -inset-1 bg-gradient-to-r from-${glowColor}-500 via-purple-500 to-pink-500 rounded-xl opacity-30 blur-lg animate-pulse`} />
    <div className="relative backdrop-blur-xl bg-black/40 border border-white/20 rounded-xl overflow-hidden">
      {children}
    </div>
  </motion.div>
);

// Sidebar Navigation Item
const QuantumNavItem = ({ 
  icon, 
  label, 
  active = false,
  onClick,
  count
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
  count?: number;
}) => {
  return (
    <motion.button
      className={`w-full group relative overflow-hidden rounded-xl p-4 transition-all duration-300 ${
        active 
          ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30' 
          : 'hover:bg-white/5 border border-transparent'
      }`}
      onClick={onClick}
      whileHover={{ x: 8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      
      <div className="relative flex items-center gap-4">
        <motion.div 
          className={`p-2 rounded-lg ${active ? 'text-cyan-400 bg-cyan-400/20' : 'text-white/70 group-hover:text-cyan-400 group-hover:bg-cyan-400/10'}`}
          animate={active ? { 
            rotateY: [0, 360],
            scale: [1, 1.1, 1]
          } : {}}
          transition={{ 
            duration: 2,
            repeat: active ? Infinity : 0,
            repeatType: "loop"
          }}
        >
          {icon}
        </motion.div>
        
        <div className="flex-1 text-left">
          <span className={`font-medium ${active ? 'text-cyan-400' : 'text-white group-hover:text-cyan-400'}`}>
            {label}
          </span>
          {count && (
            <motion.span
              className="ml-2 px-2 py-0.5 bg-purple-500/30 text-purple-300 text-xs rounded-full"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {count}
            </motion.span>
          )}
        </div>
        
        {active && (
          <motion.div
            className="text-cyan-400"
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronRight size={16} />
          </motion.div>
        )}
      </div>
      
      {/* Active indicator */}
      {active && (
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-purple-500"
          layoutId="activeIndicator"
        />
      )}
    </motion.button>
  );
};

// Dashboard Stats Card
const StatsCard = ({
  title,
  value,
  change,
  icon,
  trend = "up",
  children
}: {
  title: string;
  value: string | number;
  change?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down";
  children?: React.ReactNode;
}) => (
  <HolographicCard className="h-full">
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-white/60 text-sm font-medium">{title}</p>
          <motion.p 
            className="text-2xl font-bold text-white mt-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {value}
          </motion.p>
        </div>
        {icon && (
          <motion.div 
            className="text-cyan-400 p-3 bg-cyan-400/20 rounded-xl"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {icon}
          </motion.div>
        )}
      </div>
      
      {change && (
        <div className={`flex items-center gap-1 text-sm ${
          trend === 'up' ? 'text-emerald-400' : 'text-red-400'
        }`}>
          <TrendingUp size={14} className={trend === 'down' ? 'rotate-180' : ''} />
          <span>{change}</span>
        </div>
      )}
      
      {children}
    </div>
  </HolographicCard>
);

// Quick Action Button
const QuickActionBtn = ({ 
  icon, 
  label, 
  onClick,
  variant = "default"
}: { 
  icon: React.ReactNode; 
  label: string; 
  onClick: () => void;
  variant?: "default" | "success" | "warning" | "danger";
}) => {
  const variants = {
    default: "from-cyan-500/20 to-purple-500/20 border-cyan-500/30 hover:from-cyan-500/30 hover:to-purple-500/30",
    success: "from-emerald-500/20 to-green-500/20 border-emerald-500/30 hover:from-emerald-500/30 hover:to-green-500/30",
    warning: "from-amber-500/20 to-orange-500/20 border-amber-500/30 hover:from-amber-500/30 hover:to-orange-500/30",
    danger: "from-red-500/20 to-rose-500/20 border-red-500/30 hover:from-red-500/30 hover:to-rose-500/30"
  };
  
  return (
    <motion.button
      className={`w-full p-4 rounded-xl backdrop-blur-xl bg-gradient-to-r ${variants[variant]} border transition-all duration-300 group`}
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3">
        <motion.div 
          className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors"
          whileHover={{ rotate: 10 }}
        >
          {icon}
        </motion.div>
        <span className="font-medium">{label}</span>
      </div>
    </motion.button>
  );
};

// Activity Feed Item
const ActivityItem = ({ 
  user, 
  action, 
  time, 
  type = "info" 
}: { 
  user: string; 
  action: string; 
  time: string;
  type?: "info" | "success" | "warning";
}) => {
  const typeColors = {
    info: "text-cyan-400",
    success: "text-emerald-400",
    warning: "text-amber-400"
  };
  
  return (
    <motion.div 
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 5 }}
    >
      <div className={`w-2 h-2 rounded-full ${typeColors[type]} animate-pulse`} />
      <div className="flex-1">
        <p className="text-sm">
          <span className={`font-medium ${typeColors[type]}`}>{user}</span>
          <span className="text-white/70 ml-1">{action}</span>
        </p>
        <p className="text-xs text-white/50">{time}</p>
      </div>
    </motion.div>
  );
};

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated as admin
    const adminAuthenticated = localStorage.getItem("adminAuthenticated");
    if (!adminAuthenticated) {
      toast({
        title: "⚡ Access Denied",
        description: "Please authenticate to access the quantum admin interface.",
        variant: "destructive",
      });
      navigate("/admin-login");
    } else {
      setIsAdmin(true);
    }
  }, [navigate, toast]);
  
  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    toast({
      title: "🌌 Session Terminated",
      description: "Admin neural connection successfully disconnected.",
    });
    navigate("/");
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const sidebarItems = [
    { id: "dashboard", icon: <LayoutDashboard size={20} />, label: "Neural Dashboard", count: 3 },
    { id: "events", icon: <Calendar size={20} />, label: "Event Matrix", count: 12 },
    { id: "projects", icon: <FolderOpen size={20} />, label: "Project Nexus", count: 48 },
    { id: "resources", icon: <BookOpen size={20} />, label: "Data Archive", count: 156 },
    { id: "gallery", icon: <Image size={20} />, label: "Visual Vault", count: 89 },
    { id: "users", icon: <Users size={20} />, label: "User Network", count: 1245 }
  ];

  return (
    <AnimatedPage>
      <Navbar />
      
      <main className="min-h-screen pt-16 relative overflow-hidden">
        <HolographicBackground />
        
        {/* Cyber Grid Overlay */}
        <div className="absolute inset-0 z-10 opacity-10 pointer-events-none">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 py-8 relative z-20">
          {/* Header */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <motion.h1 
                  className="text-5xl font-bold mb-2"
                  style={{
                    background: 'linear-gradient(135deg, #00f5ff 0%, #8b5cf6 50%, #f0abfc 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    backgroundSize: '200% 200%'
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  Quantum Neural Interface
                </motion.h1>
                
                <motion.div
                  className="flex items-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="h-1 w-40 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full" />
                  <div className="flex items-center gap-2 text-white/60">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-sm">System Optimal</span>
                  </div>
                </motion.div>
              </div>
              
              <motion.button
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-500/30 rounded-xl hover:from-red-500/30 hover:to-rose-500/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut size={18} />
                <span>Disconnect</span>
              </motion.button>
            </div>
          </motion.div>

          <div className="grid grid-cols-12 gap-6">
            {/* Left Sidebar */}
            <motion.div 
              className="col-span-12 lg:col-span-3"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <HolographicCard className="h-fit">
                <div className="p-6">
                  {/* Admin Profile */}
                  <div className="flex items-center gap-3 mb-6 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl">
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center"
                      animate={{ 
                        boxShadow: [
                          '0 0 20px rgba(0, 245, 255, 0.5)',
                          '0 0 30px rgba(139, 92, 246, 0.5)',
                          '0 0 20px rgba(0, 245, 255, 0.5)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Shield size={24} className="text-white" />
                    </motion.div>
                    <div>
                      <p className="font-medium text-white">Quantum Admin</p>
                      <p className="text-xs text-white/60">Neural Interface v2.4.1</p>
                    </div>
                  </div>
                  
                  {/* Navigation */}
                  <nav className="space-y-2">
                    {sidebarItems.map((item) => (
                      <QuantumNavItem
                        key={item.id}
                        icon={item.icon}
                        label={item.label}
                        active={activeSection === item.id}
                        onClick={() => setActiveSection(item.id)}
                        count={item.count}
                      />
                    ))}
                  </nav>
                </div>
              </HolographicCard>
            </motion.div>
            
            {/* Main Content */}
            <motion.div 
              className="col-span-12 lg:col-span-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeSection === "dashboard" && (
                    <div className="space-y-6">
                      {/* Main Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatsCard
                          title="Active Neural Nodes"
                          value="1,245"
                          change="+12.5%"
                          icon={<Users size={24} />}
                          trend="up"
                        />
                        <StatsCard
                          title="Data Clusters"
                          value="48"
                          change="+5.2%"
                          icon={<Database size={24} />}
                          trend="up"
                        />
                        <StatsCard
                          title="System Load"
                          value="23%"
                          change="-2.1%"
                          icon={<Cpu size={24} />}
                          trend="down"
                        />
                      </div>
                      
                      {/* Quantum Analytics */}
                      <HolographicCard>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-white">Quantum Analytics</h3>
                            <motion.div
                              className="flex items-center gap-2 text-emerald-400"
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Activity size={16} />
                              <span className="text-sm">Live</span>
                            </motion.div>
                          </div>
                          <QuantumDataViz />
                        </div>
                      </HolographicCard>
                      
                      {/* Real-time Metrics */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <StatsCard
                          title="Neural Traffic"
                          value="156.2K"
                          change="+18.3%"
                          icon={<Globe size={24} />}
                        >
                          <div className="mt-4">
                            <div className="flex justify-between text-xs text-white/60 mb-1">
                              <span>Bandwidth Usage</span>
                              <span>78%</span>
                            </div>
                            <motion.div 
                              className="h-2 bg-white/10 rounded-full overflow-hidden"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.5 }}
                            >
                              <motion.div 
                                className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: "78%" }}
                                transition={{ duration: 1.5, delay: 0.7 }}
                              />
                            </motion.div>
                          </div>
                        </StatsCard>
                        
                        <StatsCard
                          title="Energy Matrix"
                          value="91.7%"
                          change="+0.8%"
                          icon={<Zap size={24} />}
                        >
                          <div className="mt-4 space-y-2">
                            {[
                              { label: "Core Systems", value: 95 },
                              { label: "Neural Networks", value: 88 },
                              { label: "Data Processing", value: 92 }
                            ].map((item, i) => (
                              <div key={i} className="flex justify-between items-center">
                                <span className="text-xs text-white/60">{item.label}</span>
                                <div className="flex items-center gap-2">
                                  <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div 
                                      className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
                                      initial={{ width: 0 }}
                                      animate={{ width: `${item.value}%` }}
                                      transition={{ duration: 1, delay: i * 0.2 }}
                                    />
                                  </div>
                                  <span className="text-xs text-emerald-400">{item.value}%</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </StatsCard>
                      </div>
                    </div>
                  )}
                  
                  {activeSection === "events" && (
                    <HolographicCard>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-2xl font-bold text-white">Event Matrix Control</h2>
                          <Button 
                            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                            leftIcon={<PlusSquare size={16} />}
                          >
                            Create Event
                          </Button>
                        </div>
                        
                        {/* Search Bar */}
                        <div className="relative mb-6">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                          <input 
                            type="text" 
                            placeholder="Search quantum events..." 
                            className="w-full pl-10 py-3 bg-black/40 backdrop-blur-md border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-white placeholder-white/50" 
                          />
                        </div>
                        
                        {/* Events Table */}
                        <div className="overflow-x-auto rounded-lg border border-white/20">
                          <table className="w-full text-sm">
                            <thead className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-b border-white/20">
                              <tr>
                                <th className="px-6 py-4 text-left font-medium text-cyan-400">Event Name</th>
                                <th className="px-6 py-4 text-left font-medium text-cyan-400">Date</th>
                                <th className="px-6 py-4 text-left font-medium text-cyan-400">Participants</th>
                                <th className="px-6 py-4 text-left font-medium text-cyan-400">Status</th>
                                <th className="px-6 py-4 text-right font-medium text-cyan-400">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { id: 1, name: "Quantum Web3 Workshop", date: "2025-06-15", participants: 54, status: "Active" },
                                { id: 2, name: "Neural AI Hackathon", date: "2025-07-10", participants: 128, status: "Planning" },
                                { id: 3, name: "Cyberpunk Code Retreat", date: "2025-05-30", participants: 36, status: "Active" },
                                { id: 4, name: "Holographic React Masterclass", date: "2025-06-22", participants: 85, status: "Active" }
                              ].map((event, index) => (
                                <motion.tr 
                                  key={event.id}
                                  className="border-b border-white/10 bg-black/20 hover:bg-white/5 transition-colors"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  whileHover={{ x: 5 }}
                                >
                                  <td className="px-6 py-4 font-medium text-white">{event.name}</td>
                                  <td className="px-6 py-4 text-white/70">{event.date}</td>
                                  <td className="px-6 py-4 text-white/70">{event.participants}</td>
                                  <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                      event.status === "Active" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
                                      event.status === "Planning" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" :
                                      "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                                    }`}>
                                      {event.status}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                      <motion.button 
                                        className="px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-md text-xs transition-colors border border-cyan-500/30"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                      >
                                        Edit
                                      </motion.button>
                                      <motion.button 
                                        className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-md text-xs transition-colors border border-red-500/30"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                      >
                                        Delete
                                      </motion.button>
                                    </div>
                                  </td>
                                </motion.tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </HolographicCard>
                  )}
                  
                  {/* Other sections */}
                  {activeSection !== "dashboard" && activeSection !== "events" && (
                    <HolographicCard className="h-[60vh] flex items-center justify-center">
                      <div className="text-center">
                        <motion.div
                          className="mx-auto mb-6 p-6 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 w-24 h-24 flex items-center justify-center"
                          animate={{ 
                            rotateY: [0, 360],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            rotateY: { duration: 3, repeat: Infinity, ease: "linear" },
                            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                          }}
                        >
                          {activeSection === "projects" && <FolderOpen size={40} className="text-cyan-400" />}
                          {activeSection === "resources" && <BookOpen size={40} className="text-cyan-400" />}
                          {activeSection === "gallery" && <Image size={40} className="text-cyan-400" />}
                          {activeSection === "users" && <Users size={40} className="text-cyan-400" />}
                        </motion.div>
                        
                        <h3 className="text-2xl font-bold text-white mb-3">
                          {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Neural Interface
                        </h3>
                        
                        <p className="text-white/60 max-w-md mx-auto mb-6">
                          This quantum module is currently undergoing neural calibration. Advanced holographic systems coming online.
                        </p>
                        
                        <motion.div
                          className="mx-auto h-1 w-48 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full overflow-hidden"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <motion.div 
                            className="h-full w-full bg-gradient-to-r from-white/50 to-transparent"
                            animate={{ x: [-100, 100] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                          />
                        </motion.div>
                      </div>
                    </HolographicCard>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
            
            {/* Right Panel */}
            <motion.div 
              className="col-span-12 lg:col-span-3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="space-y-6">
                {/* System Alerts */}
                <HolographicCard>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Bell size={18} className="text-cyan-400" />
                      Neural Alerts
                    </h3>
                    
                    <div className="space-y-3">
                      <motion.div
                        className="p-3 rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex items-start gap-3">
                          <AlertCircle size={16} className="text-amber-400 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-amber-400">Neural Spike Detected</h4>
                            <p className="text-xs text-white/70 mt-1">User registration surge: +67% in the last quantum cycle</p>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div
                        className="p-3 rounded-lg bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="flex items-start gap-3">
                          <Shield size={16} className="text-emerald-400 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-emerald-400">Quantum Backup Complete</h4>
                            <p className="text-xs text-white/70 mt-1">Neural database successfully synchronized to quantum storage</p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </HolographicCard>
                
                {/* Quick Actions */}
                <HolographicCard>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Quantum Actions</h3>
                    <div className="space-y-3">
                      <QuickActionBtn 
                        icon={<Upload size={16} />} 
                        label="Upload Neural Data" 
                        onClick={() => {}}
                        variant="success"
                      />
                      <QuickActionBtn 
                        icon={<Calendar size={16} />} 
                        label="Schedule Matrix Event" 
                        onClick={() => {}}
                      />
                      <QuickActionBtn 
                        icon={<Users size={16} />} 
                        label="Manage Neural Network" 
                        onClick={() => {}}
                        variant="warning"
                      />
                      <QuickActionBtn 
                        icon={<RotateCw size={16} />} 
                        label="Sync Quantum State" 
                        onClick={() => {}}
                      />
                    </div>
                  </div>
                </HolographicCard>
                
                {/* Activity Feed */}
                <HolographicCard>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Activity size={18} className="text-cyan-400" />
                      Neural Activity
                    </h3>
                    
                    <div className="space-y-1 max-h-64 overflow-y-auto custom-scrollbar">
                      {[
                        { user: "Quantum_Sarah", action: "initiated new project matrix", time: "2 cycles ago", type: "success" },
                        { user: "Neural_Mike", action: "joined event: Web3 Workshop", time: "3 cycles ago", type: "info" },
                        { user: "Cyber_Alex", action: "uploaded neural pattern", time: "5 cycles ago", type: "warning" },
                        { user: "Holo_Emily", action: "synchronized data cluster", time: "1 quantum day", type: "success" },
                        { user: "Matrix_David", action: "updated profile neural map", time: "1 quantum day", type: "info" }
                      ].map((activity, index) => (
                        <ActivityItem 
                          key={index}
                          user={activity.user}
                          action={activity.action}
                          time={activity.time}
                          type={activity.type as any}
                        />
                      ))}
                    </div>
                  </div>
                </HolographicCard>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #00f5ff, #8b5cf6);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #00d4ff, #7c3aed);
        }
      `}</style>
    </AnimatedPage>
  );
};

export default AdminPage;
