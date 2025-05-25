import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedPage from "../components/AnimatedPage";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  Calendar, 
  Heart, 
  BookOpen, 
  Bell, 
  Users, 
  Star,
  ChevronRight,
  Sparkles,
  Bot,
  Send,
  Bookmark,
  Clock,
  MapPin,
  Check,
  X,
  Zap,
  Cpu,
  Activity
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// 3D Floating Particles Background
const FloatingParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={300}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color="#00f5ff" 
        transparent 
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
};

// 3D Background Scene
const ParticleBackground = () => (
  <div className="fixed inset-0 z-0">
    <Canvas 
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ alpha: true, antialias: true }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <FloatingParticles />
      <Sphere args={[1, 32, 32]} position={[-4, 0, -5]}>
        <MeshDistortMaterial
          color="#8b5cf6"
          distort={0.3}
          speed={2}
          roughness={0.4}
        />
      </Sphere>
      <Sphere args={[0.8, 32, 32]} position={[4, -2, -3]}>
        <MeshDistortMaterial
          color="#06b6d4"
          distort={0.4}
          speed={1.5}
          roughness={0.2}
        />
      </Sphere>
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  </div>
);

// Glass Card Component
const GlassCard = ({ 
  children, 
  className = "",
  hover3d = true 
}: { 
  children: React.ReactNode; 
  className?: string;
  hover3d?: boolean;
}) => (
  <motion.div
    className={`relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden ${className}`}
    whileHover={hover3d ? { 
      scale: 1.02,
      rotateX: 2,
      rotateY: 2,
      z: 50
    } : {}}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    style={{ transformStyle: "preserve-3d" }}
  >
    {/* Glass reflection effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50" />
    <div className="relative z-10">{children}</div>
  </motion.div>
);

// AI Assistant Component
const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your CodeBird AI assistant. How can I help you today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    
    setMessages(prev => [...prev, 
      { role: 'user', content: inputMessage },
      { role: 'assistant', content: 'Thanks for your message! I\'m learning to help you better.' }
    ]);
    setInputMessage('');
  };

  return (
    <>
      {/* Floating AI Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          boxShadow: [
            "0 0 20px rgba(139, 92, 246, 0.5)",
            "0 0 40px rgba(139, 92, 246, 0.8)",
            "0 0 20px rgba(139, 92, 246, 0.5)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Bot size={24} className="text-white" />
      </motion.button>

      {/* AI Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            className="fixed bottom-24 right-6 w-80 h-96 z-50"
          >
            <GlassCard className="h-full flex flex-col">
              <div className="p-4 border-b border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                  <h3 className="font-medium text-white">AI CodeBird</h3>
                  <div className="ml-auto">
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="text-white/60 hover:text-white"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-lg ${
                      msg.role === 'user' 
                        ? 'bg-purple-500/20 ml-4' 
                        : 'bg-cyan-500/20 mr-4'
                    }`}
                  >
                    <p className="text-sm text-white">{msg.content}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="p-4 border-t border-white/20">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask me anything..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button 
                    onClick={sendMessage}
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Event Card Component
const EventCard = ({ event, isRegistered, onRegister, onUnregister }: any) => (
  <GlassCard className="p-6">
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-white text-lg">{event.title}</h3>
          <p className="text-white/70 text-sm mt-1">{event.description}</p>
        </div>
        <Badge variant={isRegistered ? "default" : "outline"} className="ml-2">
          {isRegistered ? "Registered" : "Available"}
        </Badge>
      </div>
      
      <div className="flex items-center gap-4 text-sm text-white/60">
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
        {event.location && (
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span>{event.location}</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between pt-2">
        <div className="text-sm text-white/60">
          {event.current_participants || 0} / {event.max_participants || "∞"} participants
        </div>
        
        <Button
          onClick={() => isRegistered ? onUnregister(event.id) : onRegister(event.id)}
          variant={isRegistered ? "outline" : "default"}
          size="sm"
          className={isRegistered ? 
            "border-red-500/50 text-red-400 hover:bg-red-500/20" : 
            "bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
          }
        >
          {isRegistered ? "Unregister" : "Register"}
        </Button>
      </div>
    </div>
  </GlassCard>
);

// Resource Card Component  
const ResourceCard = ({ resource, isSaved, onToggleSave }: any) => (
  <GlassCard className="p-6">
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-bold text-white">{resource.title}</h3>
          <p className="text-white/70 text-sm mt-1">{resource.description}</p>
        </div>
        <Button
          onClick={() => onToggleSave(resource.id)}
          variant="ghost"
          size="sm"
          className="text-white/60 hover:text-white"
        >
          <Heart size={16} className={isSaved ? "fill-red-500 text-red-500" : ""} />
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-xs">
          {resource.type}
        </Badge>
        <Badge variant="outline" className="text-xs">
          {resource.difficulty}
        </Badge>
      </div>
      
      {resource.url && (
        <Button 
          asChild
          variant="outline" 
          size="sm"
          className="w-full"
        >
          <a href={resource.url} target="_blank" rel="noopener noreferrer">
            View Resource
          </a>
        </Button>
      )}
    </div>
  </GlassCard>
);

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("events");
  const [userRegistrations, setUserRegistrations] = useState<string[]>([]);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch user events
  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  // Fetch resources
  const { data: resources } = useQuery({
    queryKey: ["resources"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const tabs = [
    { id: "events", label: "My Events", icon: <Calendar size={18} /> },
    { id: "saved", label: "Saved Items", icon: <Heart size={18} /> },
    { id: "resources", label: "My Resources", icon: <BookOpen size={18} /> },
    { id: "reminders", label: "Reminders", icon: <Bell size={18} /> }
  ];

  const handleRegister = (eventId: string) => {
    setUserRegistrations(prev => [...prev, eventId]);
    toast.success("Successfully registered for event!");
  };

  const handleUnregister = (eventId: string) => {
    setUserRegistrations(prev => prev.filter(id => id !== eventId));
    toast.success("Unregistered from event");
  };

  const handleToggleSave = (itemId: string) => {
    setSavedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
    toast.success(savedItems.includes(itemId) ? "Removed from saved" : "Added to saved");
  };

  if (loading) {
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
    <AnimatedPage>
      <Navbar />
      <ParticleBackground />
      
      <main className="min-h-screen pt-16 relative z-10">
        <div className="container mx-auto px-4 py-8">
          {/* Header with personalized greeting */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-8" hover3d={false}>
              <div className="flex items-center justify-between">
                <div>
                  <motion.h1 
                    className="text-4xl font-bold mb-2"
                    style={{
                      background: 'linear-gradient(135deg, #00f5ff 0%, #8b5cf6 50%, #f0abfc 100%)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent'
                    }}
                  >
                    Welcome back, {profile?.full_name || user?.email?.split('@')[0]}! 
                  </motion.h1>
                  <p className="text-white/70">Ready to explore the galaxy of code?</p>
                </div>
                
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-6xl"
                >
                  🚀
                </motion.div>
              </div>
              
              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">{userRegistrations.length}</div>
                  <div className="text-xs text-white/60">Registered Events</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{savedItems.length}</div>
                  <div className="text-xs text-white/60">Saved Items</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-400">{resources?.length || 0}</div>
                  <div className="text-xs text-white/60">Available Resources</div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <GlassCard className="p-2" hover3d={false}>
              <div className="flex space-x-1">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple-500/30 to-cyan-500/30 text-white border border-purple-500/50'
                        : 'hover:bg-white/10 text-white/70'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "events" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Available Events</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {events?.map((event) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        isRegistered={userRegistrations.includes(event.id)}
                        onRegister={handleRegister}
                        onUnregister={handleUnregister}
                      />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "saved" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Your Saved Items</h2>
                  {savedItems.length === 0 ? (
                    <GlassCard className="p-12 text-center">
                      <Bookmark size={48} className="mx-auto text-white/40 mb-4" />
                      <h3 className="text-xl font-medium text-white mb-2">No saved items yet</h3>
                      <p className="text-white/60">Start exploring and save your favorite resources!</p>
                    </GlassCard>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {resources?.filter(resource => savedItems.includes(resource.id)).map((resource) => (
                        <ResourceCard
                          key={resource.id}
                          resource={resource}
                          isSaved={true}
                          onToggleSave={handleToggleSave}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "resources" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Learning Resources</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {resources?.map((resource) => (
                      <ResourceCard
                        key={resource.id}
                        resource={resource}
                        isSaved={savedItems.includes(resource.id)}
                        onToggleSave={handleToggleSave}
                      />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reminders" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Event Reminders</h2>
                  <GlassCard className="p-8 text-center">
                    <Bell size={48} className="mx-auto text-white/40 mb-4" />
                    <h3 className="text-xl font-medium text-white mb-2">No reminders set</h3>
                    <p className="text-white/60">Register for events to receive reminders!</p>
                  </GlassCard>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <AIAssistant />
      <Footer />
    </AnimatedPage>
  );
};

export default UserDashboard;
