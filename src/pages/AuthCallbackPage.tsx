
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AuthCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Auth callback error:", error);
          toast.error("Authentication failed");
          navigate("/auth");
          return;
        }

        if (data.session) {
          console.log("Session found, checking user role...");
          
          // Check if user is super admin first
          const { data: superAdminData } = await supabase
            .from("super_admins")
            .select("id")
            .eq("id", data.session.user.id)
            .single();

          if (superAdminData) {
            console.log("Super admin detected, redirecting to admin panel");
            toast.success("Welcome back, Super Admin!");
            navigate("/admin");
            return;
          }

          // Check regular profile role
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", data.session.user.id)
            .single();
          
          console.log("User profile:", profile);
          
          if (profile?.role === 'admin') {
            console.log("Admin user detected, redirecting to admin panel");
            toast.success("Welcome back, Admin!");
            navigate("/admin");
          } else {
            console.log("Regular user detected, redirecting to dashboard");
            toast.success("Successfully signed in!");
            navigate("/dashboard");
          }
        } else {
          navigate("/auth");
        }
      } catch (err) {
        console.error("Callback handling error:", err);
        toast.error("Something went wrong during authentication");
        navigate("/auth");
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-white">Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthCallbackPage;
