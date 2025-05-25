
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

// Type for the database function response
interface DatabaseFunctionResponse {
  success: boolean;
  message: string;
  action?: string;
}

export const useEventRegistration = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async ({ eventId, action }: { eventId: string; action: 'register' | 'unregister' }) => {
      if (!user) throw new Error("Must be logged in");
      
      if (action === 'register') {
        const { data, error } = await supabase.rpc('register_for_event', { 
          event_id: eventId 
        });
        if (error) throw error;
        return data as DatabaseFunctionResponse;
      } else {
        const { data, error } = await supabase.rpc('unregister_from_event', { 
          event_id: eventId 
        });
        if (error) throw error;
        return data as DatabaseFunctionResponse;
      }
    },
    onSuccess: (data, { action }) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event-registrations"] });
      
      if (data?.success) {
        toast.success(data.message);
      } else {
        toast.error(data?.message || "Registration failed");
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "Registration failed");
    }
  });
};

export const useUserRegistrations = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["event-registrations", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from("event_registrations")
        .select("event_id")
        .eq("user_id", user.id);
      
      if (error) throw error;
      return data.map(reg => reg.event_id);
    },
    enabled: !!user,
  });
};
