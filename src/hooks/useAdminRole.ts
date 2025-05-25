
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const useAdminRole = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["admin-role", user?.id],
    queryFn: async () => {
      if (!user) return false;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      
      if (error) {
        console.error("Error fetching user role:", error);
        return false;
      }
      
      return data?.role === 'admin';
    },
    enabled: !!user,
  });
};

export const usePromoteToAdmin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (userId: string) => {
      const { data, error } = await supabase
        .from("profiles")
        .update({ role: 'admin' })
        .eq("id", userId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-role"] });
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      toast.success(`User promoted to admin successfully!`);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to promote user to admin");
    },
  });
};
