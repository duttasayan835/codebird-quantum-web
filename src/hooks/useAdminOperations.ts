
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useAdminOperations = () => {
  const queryClient = useQueryClient();

  const logActivity = async (actionType: string, description: string, targetType?: string, targetId?: string) => {
    try {
      await supabase.rpc('log_admin_activity', {
        p_action_type: actionType,
        p_target_type: targetType,
        p_target_id: targetId,
        p_description: description
      });
    } catch (error) {
      console.error("Failed to log admin activity:", error);
    }
  };

  const blockUser = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from("profiles")
        .update({ blocked: true })
        .eq("id", userId);
      
      if (error) throw error;
      return userId;
    },
    onSuccess: (userId) => {
      logActivity('block_user', `Blocked user ${userId}`, 'user', userId);
      toast.success("User blocked successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to block user");
    }
  });

  const unblockUser = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from("profiles")
        .update({ blocked: false })
        .eq("id", userId);
      
      if (error) throw error;
      return userId;
    },
    onSuccess: (userId) => {
      logActivity('unblock_user', `Unblocked user ${userId}`, 'user', userId);
      toast.success("User unblocked successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to unblock user");
    }
  });

  return {
    blockUser,
    unblockUser,
    logActivity
  };
};

export const useAuditLogs = () => {
  return useQuery({
    queryKey: ["audit-logs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("admin_activity_logs")
        .select(`
          *,
          profiles:admin_id(full_name, email)
        `)
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) throw error;
      return data;
    }
  });
};
