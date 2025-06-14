
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { SavedItemResponse } from "@/types/database";

export const useEventRegistration = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const registerForEvent = useMutation({
    mutationFn: async (eventId: string) => {
      if (!user) throw new Error("Must be logged in to register");
      
      const { data, error } = await supabase.rpc('register_for_event', {
        event_id: eventId
      });
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully registered for event!");
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["user-registrations"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to register for event");
    }
  });

  const unregisterFromEvent = useMutation({
    mutationFn: async (eventId: string) => {
      if (!user) throw new Error("Must be logged in to unregister");
      
      const { data, error } = await supabase.rpc('unregister_from_event', {
        event_id: eventId
      });
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully unregistered from event!");
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["user-registrations"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to unregister from event");
    }
  });

  const getUserRegistrations = useQuery({
    queryKey: ["user-registrations", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from("event_registrations")
        .select("event_id")
        .eq("user_id", user.id);
      
      if (error) throw error;
      return data.map(reg => reg.event_id);
    },
    enabled: !!user
  });

  return {
    registerForEvent,
    unregisterFromEvent,
    getUserRegistrations
  };
};

export const useProjectLikes = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const toggleProjectLike = useMutation({
    mutationFn: async (projectId: string) => {
      if (!user) throw new Error("Must be logged in to like projects");
      
      const { data, error } = await supabase.rpc('toggle_saved_item', {
        content_type: 'project',
        content_id: projectId
      });
      
      if (error) throw error;
      return data as unknown as SavedItemResponse;
    },
    onSuccess: (data) => {
      toast.success(data.action === 'added' ? "Project liked!" : "Project unliked!");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["user-likes"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to toggle like");
    }
  });

  const toggleResourceLike = useMutation({
    mutationFn: async (resourceId: string) => {
      if (!user) throw new Error("Must be logged in to like resources");
      
      const { data, error } = await supabase.rpc('toggle_saved_item', {
        content_type: 'resource',
        content_id: resourceId
      });
      
      if (error) throw error;
      return data as unknown as SavedItemResponse;
    },
    onSuccess: (data) => {
      toast.success(data.action === 'added' ? "Resource saved!" : "Resource unsaved!");
      queryClient.invalidateQueries({ queryKey: ["resources"] });
      queryClient.invalidateQueries({ queryKey: ["user-likes"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to toggle save");
    }
  });

  const getUserLikes = useQuery({
    queryKey: ["user-likes", user?.id],
    queryFn: async () => {
      if (!user) return { projects: [], resources: [] };
      
      const { data, error } = await supabase
        .from("user_saved_items")
        .select("content_type, content_id")
        .eq("user_id", user.id);
      
      if (error) throw error;
      
      const projects = data.filter(item => item.content_type === 'project').map(item => item.content_id);
      const resources = data.filter(item => item.content_type === 'resource').map(item => item.content_id);
      
      return { projects, resources };
    },
    enabled: !!user
  });

  return {
    toggleProjectLike,
    toggleResourceLike,
    getUserLikes
  };
};
