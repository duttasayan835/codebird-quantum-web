
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useInviteCodes = () => {
  const queryClient = useQueryClient();

  const validateInviteCode = useMutation({
    mutationFn: async (code: string) => {
      const { data, error } = await supabase
        .from("admin_invitations")
        .select("*")
        .eq("code", code)
        .eq("used", false)
        .gt("expires_at", new Date().toISOString())
        .single();
      
      if (error) throw error;
      return data;
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to validate invite code");
    }
  });

  const useInviteCode = useMutation({
    mutationFn: async ({ code, userId }: { code: string; userId: string }) => {
      // First validate the code
      const { data: inviteData, error: fetchError } = await supabase
        .from("admin_invitations")
        .select("*")
        .eq("code", code)
        .eq("used", false)
        .gt("expires_at", new Date().toISOString())
        .single();
      
      if (fetchError) throw fetchError;
      
      // Mark as used
      const { error: updateError } = await supabase
        .from("admin_invitations")
        .update({ used: true, used_by: userId })
        .eq("id", inviteData.id);
      
      if (updateError) throw updateError;
      
      // Update user role to admin (since these are admin invitations)
      const { error: roleError } = await supabase
        .from("profiles")
        .update({ role: "admin" })
        .eq("id", userId);
      
      if (roleError) throw roleError;
      
      return { success: true };
    },
    onSuccess: () => {
      toast.success("Invite code used successfully! Your role has been updated.");
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to use invite code");
    }
  });

  const createInviteCode = useMutation({
    mutationFn: async ({ role, expiresInDays = 7 }: { role: 'admin' | 'user'; expiresInDays?: number }) => {
      const code = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + expiresInDays);
      
      const { error } = await supabase
        .from("admin_invitations")
        .insert({
          code,
          expires_at: expiresAt.toISOString()
        });
      
      if (error) throw error;
      return { code, expiresAt };
    },
    onSuccess: () => {
      toast.success("Invite code created successfully!");
      queryClient.invalidateQueries({ queryKey: ["invite-codes"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create invite code");
    }
  });

  const getInviteCodes = useQuery({
    queryKey: ["invite-codes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("admin_invitations")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  return {
    validateInviteCode,
    useInviteCode,
    createInviteCode,
    getInviteCodes
  };
};
