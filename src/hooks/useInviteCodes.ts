
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useInviteCodes = () => {
  const queryClient = useQueryClient();

  const validateInviteCode = useMutation({
    mutationFn: async (code: string) => {
      const { data, error } = await supabase.rpc('validate_invite_code', {
        invite_code: code
      });
      
      if (error) throw error;
      return data[0];
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to validate invite code");
    }
  });

  const useInviteCode = useMutation({
    mutationFn: async ({ code, userId }: { code: string; userId: string }) => {
      const { data, error } = await supabase.rpc('use_invite_code', {
        invite_code: code,
        user_id: userId
      });
      
      if (error) throw error;
      return data;
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
        .from("invite_codes")
        .insert({
          code,
          role,
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
        .from("invite_codes")
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
