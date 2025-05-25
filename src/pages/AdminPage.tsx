
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminRole } from "@/hooks/useAdminRole";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  Shield, 
  Users, 
  Calendar, 
  Image, 
  BookOpen, 
  Cpu, 
  Edit3, 
  Trash2, 
  Plus, 
  Eye, 
  EyeOff, 
  Download,
  Upload,
  Activity,
  Zap,
  Settings,
  Database,
  Server,
  Monitor,
  Globe,
  Lock,
  Unlock,
  UserPlus,
  Crown,
  Terminal,
  BarChart3
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

// Quantum Particle System for Admin
const QuantumAdminParticles = () => {
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
      type: 'quantum' | 'data' | 'neural';
    }> = [];
    
    // Create quantum particles
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        size: Math.random() * 4 + 1,
        hue: 180 + Math.random() * 60,
        energy: Math.random(),
        type: ['quantum', 'data', 'neural'][Math.floor(Math.random() * 3)] as 'quantum' | 'data' | 'neural'
      });
    }
    
    let frame = 0;
    
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      frame += 0.02;
      
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle based on type
        const alpha = 0.7 + Math.sin(frame + i * 0.1) * 0.3;
        
        if (particle.type === 'quantum') {
          // Quantum dots with pulsing
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * (1 + Math.sin(frame * 2) * 0.3), 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${particle.hue}, 100%, 70%, ${alpha})`;
          ctx.fill();
          
          // Quantum glow
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${particle.hue}, 100%, 50%, ${alpha * 0.3})`;
          ctx.fill();
        } else if (particle.type === 'data') {
          // Data cubes
          ctx.save();
          ctx.translate(particle.x, particle.y);
          ctx.rotate(frame + i * 0.1);
          ctx.fillStyle = `hsla(${particle.hue + 60}, 100%, 60%, ${alpha})`;
          ctx.fillRect(-particle.size/2, -particle.size/2, particle.size, particle.size);
          ctx.restore();
        } else {
          // Neural connections
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${particle.hue + 120}, 100%, 80%, ${alpha})`;
          ctx.fill();
        }
        
        // Neural network connections
        particles.forEach((other, j) => {
          if (i !== j && particle.type === 'neural' && other.type === 'neural') {
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200) {
              ctx.beginPath();
              ctx.strokeStyle = `hsla(${(particle.hue + other.hue) / 2}, 100%, 60%, ${0.4 * (1 - distance / 200)})`;
              ctx.lineWidth = 1;
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
      className="fixed inset-0 z-0"
      style={{ background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)' }}
    />
  );
};

// Holographic Panel Component
const HolographicPanel = ({ 
  children, 
  className = "",
  title,
  icon 
}: { 
  children: React.ReactNode; 
  className?: string;
  title?: string;
  icon?: React.ReactNode;
}) => (
  <motion.div
    className={`relative ${className}`}
    whileHover={{ scale: 1.02, rotateX: 5, rotateY: 5 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    style={{ transformStyle: "preserve-3d" }}
  >
    {/* Holographic background layers */}
    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 rounded-2xl opacity-60 blur-lg animate-pulse" />
    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400/40 via-purple-400/40 to-pink-400/40 rounded-2xl opacity-80 blur-md" />
    
    {/* Main panel */}
    <div className="relative backdrop-blur-xl bg-black/60 border border-cyan-400/30 rounded-2xl overflow-hidden">
      {/* Animated border flow */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0, 245, 255, 0.6), transparent)',
          backgroundSize: '200% 100%'
        }}
        animate={{
          backgroundPosition: ['0% 0%', '200% 0%']
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {title && (
        <div className="relative z-10 p-4 border-b border-cyan-400/20">
          <div className="flex items-center gap-3">
            {icon && <div className="text-cyan-400">{icon}</div>}
            <h3 className="text-lg font-bold text-white">{title}</h3>
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
    </div>
  </motion.div>
);

// System Status Indicator
const SystemStatus = ({ label, status, value }: { label: string; status: 'online' | 'warning' | 'error'; value?: string }) => (
  <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-white/10">
    <span className="text-white/80 text-sm">{label}</span>
    <div className="flex items-center gap-2">
      {value && <span className="text-cyan-400 text-sm font-mono">{value}</span>}
      <motion.div
        className={`w-3 h-3 rounded-full ${
          status === 'online' ? 'bg-green-400' :
          status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
        }`}
        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  </div>
);

// Terminal Log Component
const TerminalLogs = () => {
  const [logs, setLogs] = useState([
    { id: 1, type: 'info', message: 'System initialized successfully', timestamp: new Date() },
    { id: 2, type: 'success', message: 'Database connection established', timestamp: new Date() },
    { id: 3, type: 'warning', message: 'High memory usage detected', timestamp: new Date() },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const messages = [
        'User authentication successful',
        'Data synchronization complete',
        'Cache optimization running',
        'Security scan completed',
        'Performance metrics updated'
      ];
      
      setLogs(prev => [...prev.slice(-4), {
        id: Date.now(),
        type: ['info', 'success', 'warning'][Math.floor(Math.random() * 3)] as 'info' | 'success' | 'warning',
        message: messages[Math.floor(Math.random() * messages.length)],
        timestamp: new Date()
      }]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-2 max-h-60 overflow-y-auto">
      {logs.map((log) => (
        <motion.div
          key={log.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-start gap-2 text-sm font-mono"
        >
          <span className="text-cyan-400">[{log.timestamp.toLocaleTimeString()}]</span>
          <span className={
            log.type === 'success' ? 'text-green-400' :
            log.type === 'warning' ? 'text-yellow-400' : 'text-white/70'
          }>
            {log.message}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

const AdminPage = () => {
  const { user, profile, loading } = useAuth();
  const { data: isAdmin, isLoading: isAdminLoading } = useAdminRole();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [activePanel, setActivePanel] = useState("overview");
  const [createEventOpen, setCreateEventOpen] = useState(false);
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const [createResourceOpen, setCreateResourceOpen] = useState(false);

  // Redirect if not admin
  useEffect(() => {
    if (!loading && !isAdminLoading && (!user || !isAdmin)) {
      navigate("/auth");
    }
  }, [user, isAdmin, loading, isAdminLoading, navigate]);

  // Fetch admin data
  const { data: events } = useQuery({
    queryKey: ["admin-events"],
    queryFn: async () => {
      const { data, error } = await supabase.from("events").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!isAdmin
  });

  const { data: projects } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!isAdmin
  });

  const { data: resources } = useQuery({
    queryKey: ["admin-resources"],
    queryFn: async () => {
      const { data, error } = await supabase.from("resources").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!isAdmin
  });

  const { data: users } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!isAdmin
  });

  const adminPanels = [
    { id: "overview", label: "System Overview", icon: <Monitor size={20} /> },
    { id: "events", label: "Events Console", icon: <Calendar size={20} /> },
    { id: "projects", label: "Projects Hub", icon: <Cpu size={20} /> },
    { id: "resources", label: "Resources Center", icon: <BookOpen size={20} /> },
    { id: "users", label: "User Management", icon: <Users size={20} /> },
    { id: "analytics", label: "System Analytics", icon: <BarChart3 size={20} /> }
  ];

  if (loading || isAdminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <QuantumAdminParticles />
      
      {/* Header */}
      <motion.header
        className="relative z-10 p-6 border-b border-cyan-400/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="p-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-xl"
            >
              <Shield className="w-8 h-8 text-cyan-400" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Quantum Command Center
              </h1>
              <p className="text-white/60">Neural Administrative Interface</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-cyan-400 font-medium">{profile?.full_name}</p>
              <p className="text-white/60 text-sm">System Administrator</p>
            </div>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/20"
            >
              Exit Interface
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Navigation */}
      <motion.nav
        className="relative z-10 p-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <HolographicPanel className="p-4">
          <div className="flex flex-wrap gap-2">
            {adminPanels.map((panel) => (
              <motion.button
                key={panel.id}
                onClick={() => setActivePanel(panel.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activePanel === panel.id
                    ? 'bg-gradient-to-r from-cyan-500/30 to-purple-500/30 text-white border border-cyan-400/50'
                    : 'hover:bg-white/10 text-white/70 border border-transparent'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {panel.icon}
                <span className="font-medium">{panel.label}</span>
              </motion.button>
            ))}
          </div>
        </HolographicPanel>
      </motion.nav>

      {/* Main Content */}
      <main className="relative z-10 p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePanel}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {activePanel === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* System Status */}
                <HolographicPanel title="System Status" icon={<Activity size={20} />} className="col-span-1">
                  <div className="space-y-3">
                    <SystemStatus label="Database" status="online" value="99.9%" />
                    <SystemStatus label="API Gateway" status="online" value="Active" />
                    <SystemStatus label="Cache" status="warning" value="78%" />
                    <SystemStatus label="Storage" status="online" value="2.1TB" />
                  </div>
                </HolographicPanel>

                {/* Quick Stats */}
                <HolographicPanel title="System Metrics" icon={<BarChart3 size={20} />} className="col-span-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">{events?.length || 0}</div>
                      <div className="text-white/60 text-sm">Events</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{projects?.length || 0}</div>
                      <div className="text-white/60 text-sm">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-pink-400">{resources?.length || 0}</div>
                      <div className="text-white/60 text-sm">Resources</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{users?.length || 0}</div>
                      <div className="text-white/60 text-sm">Users</div>
                    </div>
                  </div>
                </HolographicPanel>

                {/* Terminal Logs */}
                <HolographicPanel title="System Logs" icon={<Terminal size={20} />} className="col-span-1">
                  <TerminalLogs />
                </HolographicPanel>
              </div>
            )}

            {activePanel === "events" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Events Management</h2>
                  <Dialog open={createEventOpen} onOpenChange={setCreateEventOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">
                        <Plus size={16} className="mr-2" />
                        Create Event
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-black/90 border-cyan-400/30">
                      <DialogHeader>
                        <DialogTitle className="text-cyan-400">Create New Event</DialogTitle>
                      </DialogHeader>
                      {/* Event creation form would go here */}
                      <p className="text-white/70">Event creation form implementation...</p>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events?.map((event) => (
                    <HolographicPanel key={event.id}>
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-white">{event.title}</h3>
                            <p className="text-white/70 text-sm">{event.description}</p>
                          </div>
                          <Badge variant="outline">{event.status}</Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users size={14} />
                            <span>{event.current_participants || 0}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit3 size={14} className="mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-400 border-red-400/50">
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    </HolographicPanel>
                  ))}
                </div>
              </div>
            )}

            {/* Similar implementations for other panels... */}
            {activePanel === "projects" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Projects Console</h2>
                <p className="text-white/70">Project management interface coming soon...</p>
              </div>
            )}

            {activePanel === "resources" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Resources Center</h2>
                <p className="text-white/70">Resource management interface coming soon...</p>
              </div>
            )}

            {activePanel === "users" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">User Management</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {users?.map((user) => (
                    <HolographicPanel key={user.id}>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                            <Users size={16} className="text-white" />
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{user.full_name || "Unknown User"}</h3>
                            <p className="text-white/60 text-sm">{user.role}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Crown size={14} className="mr-1" />
                            Promote
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-400 border-red-400/50">
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    </HolographicPanel>
                  ))}
                </div>
              </div>
            )}

            {activePanel === "analytics" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">System Analytics</h2>
                <p className="text-white/70">Analytics dashboard coming soon...</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminPage;
