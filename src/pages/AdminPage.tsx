
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
  Trash, 
  Search, 
  RotateCw,
  Bell,
  Settings,
  ChevronRight,
  AlertCircle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import Button from "@/components/atoms/Button";

// Neo-cyberpunk circuit pattern
const CyberCircuitPattern = () => (
  <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
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

// Quantum Data Visualization
const QuantumViz = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const particles: { x: number; y: number; size: number; speedX: number; speedY: number; hue: number; }[] = [];
    const particleCount = 50;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        hue: 240 + Math.random() * 50
      });
    }
    
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Boundary check
        if (p.x > canvas.width || p.x < 0) p.speedX *= -1;
        if (p.y > canvas.height || p.y < 0) p.speedY *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 50%, 0.8)`;
        ctx.fill();
        
        // Draw connections
        particles.forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `hsla(${p.hue}, 100%, 50%, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0"
    />
  );
};

// Sidebar Navigation Item
const NavItem = ({ 
  icon, 
  label, 
  active = false,
  onClick 
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.button
      className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-left transition-all ${
        active 
          ? 'bg-gradient-to-r from-primary/20 to-accent/10 text-primary border-l-2 border-primary' 
          : 'hover:bg-white/5'
      }`}
      onClick={onClick}
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`${active ? 'text-primary' : 'text-foreground/70'}`}>
        {icon}
      </div>
      <span>{label}</span>
      
      {active && (
        <motion.div
          className="ml-auto text-primary"
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronRight size={16} />
        </motion.div>
      )}
    </motion.button>
  );
};

// Dashboard Card Component
const DashboardCard = ({
  title,
  value,
  icon,
  change,
  positive = true,
  borderColor,
  children
}: {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: string;
  positive?: boolean;
  borderColor?: string;
  children?: React.ReactNode;
}) => {
  return (
    <motion.div 
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className={`h-full bg-black/40 backdrop-blur-md border ${borderColor || 'border-white/10'} overflow-hidden`}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-foreground/70 text-sm font-medium">{title}</h3>
            {icon && <div className="text-primary">{icon}</div>}
          </div>
          
          <div className="flex items-end gap-2">
            <div className="text-2xl font-bold">{value}</div>
            {change && (
              <div className={`text-sm ${positive ? 'text-green-400' : 'text-rose-400'}`}>
                {positive ? '↑' : '↓'} {change}
              </div>
            )}
          </div>
          
          {children}
        </div>
      </Card>
    </motion.div>
  );
};

// Quick Action Button
const QuickActionButton = ({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) => {
  return (
    <motion.button
      className="w-full py-3 px-4 bg-black/40 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-lg transition-colors flex items-center gap-3"
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <div className="p-2 rounded-full bg-primary/20 text-primary">{icon}</div>
      <span>{label}</span>
    </motion.button>
  );
};

// Activity Item
const ActivityItem = ({ user, action, time }: { user: string; action: string; time: string }) => {
  return (
    <div className="flex justify-between py-3 border-b border-white/10">
      <div>
        <motion.span 
          className="font-medium"
          initial={{ color: "#8B5CF6" }}
          animate={{ color: "#ffffff" }}
          transition={{ duration: 1 }}
        >
          {user}
        </motion.span>{" "}
        {action}
      </div>
      <div className="text-foreground/60 text-sm">{time}</div>
    </div>
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
        title: "Access Denied",
        description: "Please authenticate to access the admin quantum interface.",
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
      title: "Logged Out",
      description: "Admin session terminated successfully.",
    });
    navigate("/");
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <AnimatedPage>
      <Navbar />
      <main className="min-h-screen pt-16 relative overflow-hidden">
        <CyberCircuitPattern />
        
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 relative">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-gradient relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Quantum Admin Interface
            </motion.h1>
            <motion.div
              className="h-1 w-40 bg-gradient-to-r from-primary via-accent to-primary rounded"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "10rem", opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
            
            <motion.p
              className="text-foreground/70 mt-4 max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Welcome to the CodeBird Club administrative neural network. Configure events, manage projects, and analyze user engagement through this quantum interface.
            </motion.p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Left Sidebar */}
            <motion.div 
              className="col-span-12 md:col-span-3 lg:col-span-2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
            >
              <div className="glass-card p-4 h-full">
                <div className="flex items-center gap-3 px-4 py-2 mb-6">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                      <path d="m15 9-6 6"></path>
                      <path d="m9 9 6 6"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Admin Portal</p>
                    <p className="text-xs text-foreground/60">v2.4.1</p>
                  </div>
                </div>
                
                <nav className="space-y-1">
                  <NavItem 
                    icon={<LayoutDashboard size={18} />} 
                    label="Dashboard" 
                    active={activeSection === "dashboard"}
                    onClick={() => setActiveSection("dashboard")}
                  />
                  <NavItem 
                    icon={<Calendar size={18} />} 
                    label="Events" 
                    active={activeSection === "events"}
                    onClick={() => setActiveSection("events")}
                  />
                  <NavItem 
                    icon={<FolderOpen size={18} />} 
                    label="Projects" 
                    active={activeSection === "projects"}
                    onClick={() => setActiveSection("projects")}
                  />
                  <NavItem 
                    icon={<BookOpen size={18} />} 
                    label="Resources" 
                    active={activeSection === "resources"}
                    onClick={() => setActiveSection("resources")}
                  />
                  <NavItem 
                    icon={<Image size={18} />} 
                    label="Gallery" 
                    active={activeSection === "gallery"}
                    onClick={() => setActiveSection("gallery")}
                  />
                  <NavItem 
                    icon={<Users size={18} />} 
                    label="Users" 
                    active={activeSection === "users"}
                    onClick={() => setActiveSection("users")}
                  />
                </nav>
                
                <div className="mt-6 pt-6 border-t border-white/10">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-rose-400 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <LogOut size={18} />
                    <span>Disconnect</span>
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* Main Content */}
            <motion.div 
              className="col-span-12 md:col-span-6 lg:col-span-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeSection === "dashboard" && (
                    <div className="space-y-6">
                      <div className="glass-card p-6 relative overflow-hidden">
                        <div className="relative z-10">
                          <h2 className="text-2xl font-bold mb-6">Control Center</h2>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <DashboardCard 
                              title="Active Users" 
                              value="1,245" 
                              icon={<Users size={20} />} 
                              change="12%" 
                              borderColor="border-green-500/20"
                            />
                            <DashboardCard 
                              title="Projects" 
                              value="48" 
                              icon={<FolderOpen size={20} />} 
                              change="5%" 
                              borderColor="border-blue-500/20"
                            />
                            <DashboardCard 
                              title="Events" 
                              value="12" 
                              icon={<Calendar size={20} />} 
                              change="0%" 
                              positive={false}
                              borderColor="border-amber-500/20"
                            />
                          </div>
                        </div>
                        <div className="absolute inset-0 z-0 opacity-30">
                          <QuantumViz />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <DashboardCard title="Page Views" value="12,567" change="8%" borderColor="border-purple-500/20">
                          <div className="mt-4 h-16 flex items-end gap-1">
                            {[35, 45, 25, 65, 55, 70, 60, 80, 75, 65, 90].map((h, i) => (
                              <motion.div 
                                key={i}
                                className="flex-1 bg-gradient-to-t from-primary/50 to-accent/50 rounded-sm"
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: i * 0.1, duration: 1, type: "spring" }}
                              />
                            ))}
                          </div>
                        </DashboardCard>
                        
                        <DashboardCard title="Event Registrations" value="354" change="15%" borderColor="border-cyan-500/20">
                          <div className="mt-4 h-16 relative">
                            <motion.div 
                              className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-primary to-accent"
                              initial={{ width: 0 }}
                              animate={{ width: "75%" }}
                              transition={{ duration: 2, delay: 0.5 }}
                            />
                            <motion.div 
                              className="absolute bottom-6 left-0 h-2 bg-gradient-to-r from-primary/70 to-accent/70"
                              initial={{ width: 0 }}
                              animate={{ width: "65%" }}
                              transition={{ duration: 1.5, delay: 0.7 }}
                            />
                            <motion.div 
                              className="absolute bottom-12 left-0 h-2 bg-gradient-to-r from-primary/40 to-accent/40"
                              initial={{ width: 0 }}
                              animate={{ width: "85%" }}
                              transition={{ duration: 1.8, delay: 0.9 }}
                            />
                          </div>
                        </DashboardCard>
                        
                        <DashboardCard title="System Status" value="Optimal" borderColor="border-emerald-500/20">
                          <div className="mt-4 flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-foreground/70">CPU Load</span>
                              <span className="text-xs">28%</span>
                            </div>
                            <motion.div 
                              className="h-1 w-full bg-white/10 rounded-full overflow-hidden"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 1 }}
                            >
                              <motion.div 
                                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: "28%" }}
                                transition={{ delay: 1.2, duration: 1 }}
                              />
                            </motion.div>
                            
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-foreground/70">Memory</span>
                              <span className="text-xs">42%</span>
                            </div>
                            <motion.div 
                              className="h-1 w-full bg-white/10 rounded-full overflow-hidden"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 1.1 }}
                            >
                              <motion.div 
                                className="h-full bg-gradient-to-r from-blue-500 to-blue-300 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: "42%" }}
                                transition={{ delay: 1.3, duration: 1 }}
                              />
                            </motion.div>
                          </div>
                        </DashboardCard>
                      </div>
                    </div>
                  )}
                  
                  {activeSection === "events" && (
                    <div className="glass-card p-6">
                      <h2 className="text-2xl font-bold mb-6">Event Management</h2>
                      <div className="flex justify-between items-center mb-6">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={16} />
                          <input 
                            type="text" 
                            placeholder="Search events..." 
                            className="pl-10 py-2 pr-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary w-full md:w-64" 
                          />
                        </div>
                        <Button 
                          className="bg-primary hover:bg-primary/90"
                          leftIcon={<PlusSquare size={16} />}
                        >
                          Create Event
                        </Button>
                      </div>
                      
                      <div className="relative overflow-x-auto rounded-lg border border-white/10">
                        <table className="w-full text-sm text-left">
                          <thead className="text-xs uppercase bg-white/5 backdrop-blur-md">
                            <tr>
                              <th scope="col" className="px-6 py-3">Event Name</th>
                              <th scope="col" className="px-6 py-3">Date</th>
                              <th scope="col" className="px-6 py-3">Registrations</th>
                              <th scope="col" className="px-6 py-3">Status</th>
                              <th scope="col" className="px-6 py-3 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { id: 1, name: "Web3 Workshop", date: "2025-06-15", registrations: 54, status: "Active" },
                              { id: 2, name: "AI Hackathon", date: "2025-07-10", registrations: 128, status: "Planning" },
                              { id: 3, name: "Code Retreat", date: "2025-05-30", registrations: 36, status: "Active" },
                              { id: 4, name: "React Masterclass", date: "2025-06-22", registrations: 85, status: "Active" }
                            ].map((event) => (
                              <motion.tr 
                                key={event.id} 
                                className="border-b border-white/10 bg-black/20 backdrop-blur-md hover:bg-white/5"
                                whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                              >
                                <td className="px-6 py-4 font-medium">{event.name}</td>
                                <td className="px-6 py-4">{event.date}</td>
                                <td className="px-6 py-4">{event.registrations}</td>
                                <td className="px-6 py-4">
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    event.status === "Active" ? "bg-green-500/20 text-green-400" :
                                    event.status === "Planning" ? "bg-amber-500/20 text-amber-400" :
                                    "bg-gray-500/20 text-gray-400"
                                  }`}>
                                    {event.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                  <button className="px-2 py-1 bg-primary/20 hover:bg-primary/30 text-primary rounded-md text-xs transition-colors">
                                    Edit
                                  </button>
                                  <button className="px-2 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded-md text-xs transition-colors">
                                    Delete
                                  </button>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  
                  {activeSection !== "dashboard" && activeSection !== "events" && (
                    <div className="glass-card p-6 h-[50vh] flex items-center justify-center">
                      <div className="text-center">
                        <motion.div
                          className="mx-auto mb-4 p-4 rounded-full bg-primary/20 w-16 h-16 flex items-center justify-center"
                          animate={{ 
                            rotate: [0, 360],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                          }}
                        >
                          {activeSection === "projects" && <FolderOpen size={32} className="text-primary" />}
                          {activeSection === "resources" && <BookOpen size={32} className="text-primary" />}
                          {activeSection === "gallery" && <Image size={32} className="text-primary" />}
                          {activeSection === "users" && <Users size={32} className="text-primary" />}
                        </motion.div>
                        <h3 className="text-xl font-bold mb-2">
                          {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Interface
                        </h3>
                        <p className="text-foreground/70 max-w-md">
                          This module is currently in development. Neural connections being established.
                        </p>
                        <motion.div
                          className="mt-6 mx-auto h-1 w-40 bg-primary/50 rounded-full overflow-hidden"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <motion.div 
                            className="h-full bg-primary"
                            animate={{ x: [-100, 100] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
            
            {/* Right Panel */}
            <motion.div 
              className="col-span-12 md:col-span-3 lg:col-span-3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.4 }}
            >
              <div className="space-y-6">
                <div className="glass-card">
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                      <Bell size={18} className="mr-2 text-primary" />
                      System Alerts
                    </h3>
                    
                    <div className="space-y-4">
                      <motion.div
                        className="p-3 rounded-lg bg-amber-500/20 border border-amber-500/20"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <div className="flex gap-3">
                          <div className="text-amber-400 mt-0.5">
                            <AlertCircle size={16} />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-amber-400">New User Spike</h4>
                            <p className="text-xs text-foreground/70 mt-1">Registration rate increased by 45% in the last hour</p>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div
                        className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/20"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        <div className="flex gap-3">
                          <div className="text-emerald-400 mt-0.5">
                            <Activity size={16} />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-emerald-400">Backup Complete</h4>
                            <p className="text-xs text-foreground/70 mt-1">Database backup successfully completed</p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <QuickActionButton 
                      icon={<Upload size={16} />} 
                      label="Upload Resources" 
                      onClick={() => {}}
                    />
                    <QuickActionButton 
                      icon={<Calendar size={16} />} 
                      label="Schedule Event" 
                      onClick={() => {}}
                    />
                    <QuickActionButton 
                      icon={<Users size={16} />} 
                      label="Manage Members" 
                      onClick={() => {}}
                    />
                    <QuickActionButton 
                      icon={<Settings size={16} />} 
                      label="System Settings" 
                      onClick={() => {}}
                    />
                    <QuickActionButton 
                      icon={<RotateCw size={16} />} 
                      label="Synchronize Data" 
                      onClick={() => {}}
                    />
                  </div>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                  <div className="space-y-1">
                    {[
                      { user: "Sarah J.", action: "Created a new project", time: "2 hours ago" },
                      { user: "Mike T.", action: "Registered for event: Web3 Workshop", time: "3 hours ago" },
                      { user: "Alex C.", action: "Commented on a blog post", time: "5 hours ago" },
                      { user: "Emily R.", action: "Submitted a resource", time: "Yesterday" },
                      { user: "David K.", action: "Updated profile", time: "Yesterday" }
                    ].map((activity, index) => (
                      <ActivityItem 
                        key={index}
                        user={activity.user}
                        action={activity.action}
                        time={activity.time}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </AnimatedPage>
  );
};

export default AdminPage;
