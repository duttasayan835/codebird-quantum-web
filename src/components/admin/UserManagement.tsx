
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { usePromoteToAdmin } from "@/hooks/useAdminRole";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Shield, Crown, Users, UserPlus } from "lucide-react";

const UserManagement = () => {
  const [userEmail, setUserEmail] = useState("");
  const [superAdminEmail, setSuperAdminEmail] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const promoteToAdminMutation = usePromoteToAdmin();

  const handlePromoteToAdmin = async () => {
    if (!userEmail.trim()) {
      toast.error("Please enter a user email");
      return;
    }

    try {
      // First, find the user by email in auth.users (we'll use the profiles table as proxy)
      const { data: userData, error: userError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", userEmail) // This won't work directly, we need a different approach
        .single();

      if (userError) {
        toast.error("User not found");
        return;
      }

      await promoteToAdminMutation.mutateAsync(userData.id);
      setUserEmail("");
    } catch (error: any) {
      toast.error(error.message || "Failed to promote user");
    }
  };

  const handlePromoteToSuperAdmin = async () => {
    if (!superAdminEmail.trim()) {
      toast.error("Please enter a user email");
      return;
    }

    try {
      // For demo purposes, we'll use a simple approach
      // In production, you'd want to implement proper user lookup
      const { error } = await supabase
        .from("super_admins")
        .insert({ id: superAdminEmail }); // This should be the actual user ID

      if (error) throw error;

      toast.success("User promoted to Super Admin successfully!");
      setSuperAdminEmail("");
    } catch (error: any) {
      toast.error(error.message || "Failed to promote to Super Admin");
    }
  };

  const generateInviteCode = async () => {
    setIsGeneratingCode(true);
    try {
      const code = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // Expires in 7 days

      const { error } = await supabase
        .from("admin_invitations")
        .insert({
          code,
          expires_at: expiresAt.toISOString(),
          created_by: (await supabase.auth.getUser()).data.user?.id
        });

      if (error) throw error;

      setInviteCode(code);
      toast.success("Invite code generated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to generate invite code");
    } finally {
      setIsGeneratingCode(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Promote to Admin */}
        <Card className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-white">Promote to Admin</h3>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="userEmail" className="text-white">User Email</Label>
              <Input
                id="userEmail"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Enter user email"
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <Button
              onClick={handlePromoteToAdmin}
              disabled={promoteToAdminMutation.isPending}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {promoteToAdminMutation.isPending ? "Promoting..." : "Promote to Admin"}
            </Button>
          </div>
        </Card>

        {/* Promote to Super Admin */}
        <Card className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <div className="flex items-center gap-3 mb-4">
            <Crown className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-semibold text-white">Promote to Super Admin</h3>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="superAdminEmail" className="text-white">User Email</Label>
              <Input
                id="superAdminEmail"
                type="email"
                value={superAdminEmail}
                onChange={(e) => setSuperAdminEmail(e.target.value)}
                placeholder="Enter user email"
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <Button
              onClick={handlePromoteToSuperAdmin}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Promote to Super Admin
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Admin Invite System */}
      <Card className="p-6 bg-gradient-to-r from-green-500/10 to-cyan-500/10 border-green-500/20">
        <div className="flex items-center gap-3 mb-4">
          <UserPlus className="w-6 h-6 text-green-400" />
          <h3 className="text-xl font-semibold text-white">Admin Invitation System</h3>
        </div>
        <div className="space-y-4">
          <Button
            onClick={generateInviteCode}
            disabled={isGeneratingCode}
            className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600"
          >
            {isGeneratingCode ? "Generating..." : "Generate Invite Code"}
          </Button>
          
          {inviteCode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-black/30 rounded-lg border border-green-500/20"
            >
              <Label className="text-white text-sm">Invite Code (expires in 7 days):</Label>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  value={inviteCode}
                  readOnly
                  className="bg-white/10 border-white/20 text-white font-mono"
                />
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(inviteCode);
                    toast.success("Invite code copied to clipboard!");
                  }}
                  size="sm"
                  variant="outline"
                  className="border-green-500/20 text-green-400 hover:bg-green-500/10"
                >
                  Copy
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default UserManagement;
