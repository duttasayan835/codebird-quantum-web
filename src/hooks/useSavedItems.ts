
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const useSavedItems = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["saved-items", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from("user_saved_items")
        .select("*")
        .eq("user_id", user.id)
        .order("saved_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};

export const useToggleSavedItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ contentType, contentId }: { contentType: string; contentId: string }) => {
      const { data, error } = await supabase.rpc('toggle_saved_item', {
        content_type: contentType,
        content_id: contentId
      });
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["saved-items"] });
      if (data?.success) {
        toast.success(data.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to save item");
    }
  });
};
