
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  profile: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData?: any) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.id);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Fetch user profile and handle redirects on login
        if (currentSession?.user && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
          try {
            await fetchProfile(currentSession.user.id);
            
            // Only redirect on successful sign in, not token refresh
            if (event === 'SIGNED_IN') {
              await handleRoleBasedRedirect(currentSession.user.id);
            }
          } catch (error) {
            console.error("Error during auth state change:", error);
          }
        }
        
        if (event === 'SIGNED_OUT') {
          setProfile(null);
          navigate("/");
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Initial session check:", currentSession?.user?.id);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        fetchProfile(currentSession.user.id);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleRoleBasedRedirect = async (userId: string) => {
    try {
      // Check if this is an admin login session
      const isAdminLogin = localStorage.getItem("adminAuthenticated") === "true";
      
      // Check if user is super admin first
      const { data: superAdminData } = await supabase
        .from("super_admins")
        .select("id")
        .eq("id", userId)
        .single();

      if (superAdminData) {
        console.log("Super admin login, redirecting to admin panel");
        localStorage.setItem("adminAuthenticated", "true");
        navigate("/admin");
        return;
      }

      // Check regular profile role
      const { data: profileData } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();
      
      if (profileData?.role === 'admin' || isAdminLogin) {
        console.log("Admin login, redirecting to admin panel");
        localStorage.setItem("adminAuthenticated", "true");
        navigate("/admin");
      } else {
        console.log("Regular user login, redirecting to dashboard");
        // Clear admin auth if it exists for regular users
        localStorage.removeItem("adminAuthenticated");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error in role-based redirect:", error);
      // Check if admin login was intended
      const isAdminLogin = localStorage.getItem("adminAuthenticated") === "true";
      if (isAdminLogin) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  };

  const fetchProfile = async (userId: string) => {
    try {
      console.log("Fetching profile for user:", userId);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        // If profile doesn't exist, create one
        if (error.code === 'PGRST116') {
          console.log("Profile not found, creating new profile");
          const { data: newProfile, error: createError } = await supabase
            .from("profiles")
            .insert({
              id: userId,
              full_name: "New User",
              role: 'user'
            })
            .select()
            .single();
          
          if (createError) {
            console.error("Error creating profile:", createError);
          } else {
            console.log("New profile created:", newProfile);
            setProfile(newProfile);
          }
        } else {
          console.error("Error fetching profile:", error);
        }
      } else {
        console.log("Profile fetched:", data);
        setProfile(data);
      }
    } catch (error) {
      console.error("Error in fetchProfile:", error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        throw error;
      }

      toast.success("Successfully signed in!");
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });

      if (error) {
        toast.error(error.message);
        throw error;
      }

      toast.success("Registration successful! Please check your email for verification.");
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      
      // Clear local state first
      setSession(null);
      setUser(null);
      setProfile(null);
      
      // Clear any admin authentication
      localStorage.removeItem("adminAuthenticated");
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Sign out error:", error);
        toast.error("Error signing out: " + error.message);
      } else {
        toast.success("Successfully signed out!");
      }
      
      // Navigate to home page regardless of error
      navigate("/");
      
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("An unexpected error occurred during sign out");
      // Still navigate to home even if there's an error
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ session, user, profile, loading, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
