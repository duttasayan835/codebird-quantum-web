
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useInviteCodes } from "@/hooks/useInviteCodes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Gift } from "lucide-react";
import OAuthButtons from "@/components/auth/OAuthButtons";
import ThemeSelector from "@/components/ThemeSelector";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    inviteCode: ""
  });
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { validateInviteCode, useInviteCode } = useInviteCodes();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
    
    // Check for invite code in URL
    const inviteFromUrl = searchParams.get("invite");
    if (inviteFromUrl) {
      setFormData(prev => ({ ...prev, inviteCode: inviteFromUrl }));
    }
  }, [user, navigate, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // If there's an invite code, use it to upgrade role
        if (formData.inviteCode) {
          try {
            await useInviteCode.mutateAsync({
              code: formData.inviteCode,
              userId: authData.user.id
            });
          } catch (inviteError) {
            console.error("Failed to use invite code:", inviteError);
            toast.error("Invalid or expired invite code");
          }
        }

        toast.success("Registration successful! Please check your email to verify your account.");
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
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
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Theme Selector */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeSelector />
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
          <Card className="backdrop-blur-xl bg-black/40 border border-cyan-500/20 p-8 shadow-2xl shadow-cyan-500/10">
            {/* Glowing Border Animation */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-sm" />
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mb-4"
                >
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">CB</span>
                  </div>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl font-bold mb-2"
                  style={{
                    background: 'linear-gradient(135deg, #00f5ff 0%, #8b5cf6 50%, #f0abfc 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent'
                  }}
                >
                  Join Codebird
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-white/70"
                >
                  Start your coding journey with the Codebird community
                </motion.p>
              </div>

              {/* OAuth Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <OAuthButtons />
              </motion.div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black/40 text-white/60">or register with email</span>
                </div>
              </div>

              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <div>
                  <Label htmlFor="fullName" className="text-white">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-cyan-400/60" />
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="pl-10 bg-white/10 border-cyan-500/30 text-white placeholder:text-white/60 focus:border-cyan-400 focus:ring-cyan-400/20"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-cyan-400/60" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 bg-white/10 border-cyan-500/30 text-white placeholder:text-white/60 focus:border-cyan-400 focus:ring-cyan-400/20"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-cyan-400/60" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 bg-white/10 border-cyan-500/30 text-white placeholder:text-white/60 focus:border-cyan-400 focus:ring-cyan-400/20"
                      placeholder="Create a password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-cyan-400/60 hover:text-cyan-400"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="inviteCode" className="text-white">Invite Code (Optional)</Label>
                  <div className="relative">
                    <Gift className="absolute left-3 top-3 h-4 w-4 text-cyan-400/60" />
                    <Input
                      id="inviteCode"
                      name="inviteCode"
                      type="text"
                      value={formData.inviteCode}
                      onChange={handleInputChange}
                      className="pl-10 bg-white/10 border-cyan-500/30 text-white placeholder:text-white/60 focus:border-cyan-400 focus:ring-cyan-400/20"
                      placeholder="Admin invite code (optional)"
                    />
                  </div>
                  <p className="text-xs text-white/50 mt-1">
                    Have an admin invite code? Enter it to get admin privileges.
                  </p>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/25"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating Account...
                      </div>
                    ) : (
                      "Join the Codebird Community"
                    )}
                  </Button>
                </motion.div>
              </motion.form>

              <div className="mt-6 text-center">
                <Link 
                  to="/login" 
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Already have an account? Sign in
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
