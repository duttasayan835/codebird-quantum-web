
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useOAuthProviders = () => {
  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });
      
      if (error) throw error;
    } catch (error: any) {
      console.error("Google OAuth error:", error);
      toast.error(error.message || "Failed to sign in with Google");
    }
  };

  const signInWithGitHub = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) throw error;
    } catch (error: any) {
      console.error("GitHub OAuth error:", error);
      toast.error(error.message || "Failed to sign in with GitHub");
    }
  };

  return {
    signInWithGoogle,
    signInWithGitHub
  };
};
