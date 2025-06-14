
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Gift } from "lucide-react";
import OAuthButtons from "@/components/auth/OAuthButtons";
import ThemeSelector from "@/components/ThemeSelector";
import { useInviteCodes } from "@/hooks/useInviteCodes";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showInviteCode, setShowInviteCode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    inviteCode: ""
  });
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const { validateInviteCode, useInviteCode } = useInviteCodes();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords don't match");
        return;
      }

      // Validate invite code if provided
      if (formData.inviteCode) {
        const inviteResult = await validateInviteCode.mutateAsync(formData.inviteCode);
        if (!inviteResult?.is_valid) {
          toast.error("Invalid or expired invite code");
          return;
        }
      }

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;

      if (data.user && formData.inviteCode) {
        // Use invite code to upgrade role
        await useInviteCode.mutateAsync({
          code: formData.inviteCode,
          userId: data.user.id
        });
      }

      toast.success("Welcome to Codebird! Please check your email for verification.");
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
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      {/* Floating Code Symbols */}
      <div className="absolute inset-0">
        {['</', '{}', '[]', '()', '===', '=>'].map((symbol, i) => (
          <motion.div
            key={i}
            className="absolute text-cyan-400/20 font-mono text-xl"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              rotate: 0
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              rotate: [0, 360],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {symbol}
          </motion.div>
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
          <Card className="backdrop-blur-xl bg-black/40 border border-purple-500/20 p-8 shadow-2xl shadow-purple-500/10">
            {/* Glowing Border */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-purple-500/20 blur-sm" />
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mb-4"
                >
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-400 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">CB</span>
                  </div>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl font-bold mb-2"
                  style={{
                    background: 'linear-gradient(135deg, #a855f7 0%, #06b6d4 50%, #8b5cf6 100%)',
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
                  Create your account and start your coding adventure
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
                  <span className="px-2 bg-black/40 text-white/60">or create with email</span>
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
                    <User className="absolute left-3 top-3 h-4 w-4 text-purple-400/60" />
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="pl-10 bg-white/10 border-purple-500/30 text-white placeholder:text-white/60 focus:border-purple-400 focus:ring-purple-400/20"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-purple-400/60" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 bg-white/10 border-purple-500/30 text-white placeholder:text-white/60 focus:border-purple-400 focus:ring-purple-400/20"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-purple-400/60" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 bg-white/10 border-purple-500/30 text-white placeholder:text-white/60 focus:border-purple-400 focus:ring-purple-400/20"
                      placeholder="Create a password"
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

                <div>
                  <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-purple-400/60" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-10 bg-white/10 border-purple-500/30 text-white placeholder:text-white/60 focus:border-purple-400 focus:ring-purple-400/20"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>

                {/* Invite Code Section */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-white">Invite Code (Optional)</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowInviteCode(!showInviteCode)}
                      className="text-purple-400 hover:text-purple-300 p-0 h-auto"
                    >
                      <Gift size={16} className="mr-1" />
                      {showInviteCode ? "Hide" : "Have a code?"}
                    </Button>
                  </div>
                  
                  <AnimatePresence>
                    {showInviteCode && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Input
                          id="inviteCode"
                          name="inviteCode"
                          type="text"
                          value={formData.inviteCode}
                          onChange={handleInputChange}
                          className="bg-white/10 border-purple-500/30 text-white placeholder:text-white/60 focus:border-purple-400 focus:ring-purple-400/20"
                          placeholder="Enter invite code for admin access"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
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
                        Creating account...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </motion.div>
              </motion.form>

              <div className="mt-6 text-center">
                <Link 
                  to="/login" 
                  className="text-purple-400 hover:text-purple-300 transition-colors"
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
