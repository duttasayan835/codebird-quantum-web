
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Shield, Crown } from "lucide-react";

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, check their role and redirect appropriately
    if (user) {
      checkUserRoleAndRedirect(user.id);
    }
  }, [user, navigate]);

  const checkUserRoleAndRedirect = async (userId: string) => {
    try {
      // Check if user is super admin
      const { data: superAdminData } = await supabase
        .from("super_admins")
        .select("id")
        .eq("id", userId)
        .single();

      if (superAdminData) {
        localStorage.setItem("adminAuthenticated", "true");
        navigate("/admin");
        return;
      }

      // Check if user has admin role
      const { data: profileData } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (profileData?.role === 'admin') {
        localStorage.setItem("adminAuthenticated", "true");
        navigate("/admin");
      } else {
        toast.error("You don't have admin privileges");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error checking admin role:", error);
      toast.error("Error verifying admin access");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Set admin authentication flag before login
      localStorage.setItem("adminAuthenticated", "true");
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        // Clear admin flag if login fails
        localStorage.removeItem("adminAuthenticated");
        throw error;
      }

      if (data.user) {
        // Verify admin privileges
        const { data: superAdminData } = await supabase
          .from("super_admins")
          .select("id")
          .eq("id", data.user.id)
          .single();

        if (superAdminData) {
          toast.success("Welcome back, Super Admin!");
          navigate("/admin");
          return;
        }

        const { data: profileData } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single();

        if (profileData?.role === 'admin') {
          toast.success("Welcome back, Admin!");
          navigate("/admin");
        } else {
          // Clear admin flag and redirect to regular dashboard
          localStorage.removeItem("adminAuthenticated");
          toast.error("You don't have admin privileges");
          navigate("/dashboard");
        }
      }
    } catch (error: any) {
      console.error("Admin login error:", error);
      localStorage.removeItem("adminAuthenticated");
      toast.error(error.message || "Admin authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 8 + 4,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Back Button */}
      <div className="absolute top-6 left-6 z-50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="text-white hover:bg-white/10 border border-white/20"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Button>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <Card className="backdrop-blur-xl bg-black/40 border border-purple-500/30 p-8 shadow-2xl shadow-purple-500/10">
            {/* Glowing Border Animation */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-purple-500/20 blur-sm" />
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mb-4"
                >
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <Shield className="text-2xl text-white" size={32} />
                  </div>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl font-bold mb-2"
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 50%, #8b5cf6 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent'
                  }}
                >
                  Admin Access
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-white/70"
                >
                  Secure admin portal for Codebird platform management
                </motion.p>
              </div>

              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div>
                  <Label htmlFor="email" className="text-white">Admin Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-purple-400/60" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 bg-white/10 border-purple-500/30 text-white placeholder:text-white/60 focus:border-purple-400 focus:ring-purple-400/20"
                      placeholder="Enter admin email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="text-white">Admin Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-purple-400/60" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 bg-white/10 border-purple-500/30 text-white placeholder:text-white/60 focus:border-purple-400 focus:ring-purple-400/20"
                      placeholder="Enter admin password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-purple-400/60 hover:text-purple-400"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-lg shadow-purple-500/25"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Verifying...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Shield size={16} className="mr-2" />
                        Access Admin Panel
                      </div>
                    )}
                  </Button>
                </motion.div>
              </motion.form>

              <div className="mt-6 text-center space-y-2">
                <Link 
                  to="/login" 
                  className="text-purple-400 hover:text-purple-300 transition-colors block"
                >
                  Regular User Login
                </Link>
                <div className="flex items-center justify-center space-x-2 text-sm text-white/60">
                  <Crown size={12} />
                  <span>Super Admin & Admin Access Only</span>
                  <Crown size={12} />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
