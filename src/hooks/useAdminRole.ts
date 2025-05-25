
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

// Hook to register for events
export const useEventRegistration = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async ({ eventId, action }: { eventId: string; action: 'register' | 'unregister' }) => {
      if (!user) throw new Error("Must be logged in");
      
      if (action === 'register') {
        // In a real implementation, you'd have an event_registrations table
        // For now, we'll just update the current_participants count
        const { data: event } = await supabase
          .from("events")
          .select("current_participants")
          .eq("id", eventId)
          .single();
          
        if (event) {
          const { error } = await supabase
            .from("events")
            .update({ current_participants: (event.current_participants || 0) + 1 })
            .eq("id", eventId);
            
          if (error) throw error;
        }
      } else {
        const { data: event } = await supabase
          .from("events")
          .select("current_participants")
          .eq("id", eventId)
          .single();
          
        if (event && event.current_participants > 0) {
          const { error } = await supabase
            .from("events")
            .update({ current_participants: event.current_participants - 1 })
            .eq("id", eventId);
            
          if (error) throw error;
        }
      }
      
      return { eventId, action };
    },
    onSuccess: ({ action }) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success(action === 'register' ? "Successfully registered!" : "Successfully unregistered!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Registration failed");
    }
  });
};
