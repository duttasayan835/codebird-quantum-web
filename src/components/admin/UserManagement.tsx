
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Shield, Crown, Users, UserPlus, Activity, Search } from "lucide-react";

const UserManagement = () => {
  const [userEmail, setUserEmail] = useState("");
  const [superAdminEmail, setSuperAdminEmail] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const [isPromotingAdmin, setIsPromotingAdmin] = useState(false);
  const [isPromotingSuperAdmin, setIsPromotingSuperAdmin] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const searchUserByEmail = async (email: string) => {
    if (!email.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const { data, error } = await supabase.rpc('get_user_by_email', {
        user_email: email
      });

      if (error) throw error;
      setSearchResults(data || []);
    } catch (error: any) {
      console.error("Error searching user:", error);
      toast.error("Error searching for user");
    }
  };

  const logAdminActivity = async (actionType: string, description: string, targetId?: string) => {
    try {
      await supabase.rpc('log_admin_activity', {
        p_action_type: actionType,
        p_target_type: 'user',
        p_target_id: targetId,
        p_description: description
      });
    } catch (error) {
      console.error("Failed to log admin activity:", error);
    }
  };

  const handlePromoteToAdmin = async () => {
    if (!userEmail.trim()) {
      toast.error("Please enter a user email");
      return;
    }

    setIsPromotingAdmin(true);
    try {
      // First, find the user by email
      const { data: userData, error: userError } = await supabase.rpc('get_user_by_email', {
        user_email: userEmail
      });

      if (userError) throw userError;
      if (!userData || userData.length === 0) {
        toast.error("User not found");
        return;
      }

      const user = userData[0];
      
      // Update user role to admin
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ role: 'admin' })
        .eq("id", user.user_id);

      if (updateError) throw updateError;

      // Log the activity
      await logAdminActivity(
        'promote_to_admin',
        `Promoted user ${userEmail} to admin role`,
        user.user_id
      );

      toast.success(`${user.full_name || userEmail} promoted to Admin successfully!`);
      setUserEmail("");
      setSearchResults([]);
    } catch (error: any) {
      toast.error(error.message || "Failed to promote user to admin");
    } finally {
      setIsPromotingAdmin(false);
    }
  };

  const handlePromoteToSuperAdmin = async () => {
    if (!superAdminEmail.trim()) {
      toast.error("Please enter a user email");
      return;
    }

    setIsPromotingSuperAdmin(true);
    try {
      // First, find the user by email
      const { data: userData, error: userError } = await supabase.rpc('get_user_by_email', {
        user_email: superAdminEmail
      });

      if (userError) throw userError;
      if (!userData || userData.length === 0) {
        toast.error("User not found");
        return;
      }

      const user = userData[0];

      // First make them admin if they aren't already
      if (user.role !== 'admin') {
        const { error: adminError } = await supabase
          .from("profiles")
          .update({ role: 'admin' })
          .eq("id", user.user_id);

        if (adminError) throw adminError;
      }

      // Add to super_admins table
      const { error: superAdminError } = await supabase
        .from("super_admins")
        .insert({ id: user.user_id });

      if (superAdminError && !superAdminError.message?.includes('duplicate')) {
        throw superAdminError;
      }

      // Log the activity
      await logAdminActivity(
        'promote_to_super_admin',
        `Promoted user ${superAdminEmail} to super admin role`,
        user.user_id
      );

      toast.success(`${user.full_name || superAdminEmail} promoted to Super Admin successfully!`);
      setSuperAdminEmail("");
    } catch (error: any) {
      toast.error(error.message || "Failed to promote to Super Admin");
    } finally {
      setIsPromotingSuperAdmin(false);
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

      // Log the activity
      await logAdminActivity(
        'generate_invite_code',
        `Generated admin invitation code: ${code}`
      );

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
                onChange={(e) => {
                  setUserEmail(e.target.value);
                  searchUserByEmail(e.target.value);
                }}
                placeholder="Enter user email"
                className="bg-white/10 border-white/20 text-white"
              />
              {searchResults.length > 0 && (
                <div className="mt-2 p-2 bg-black/30 rounded border border-blue-500/20">
                  {searchResults.map((user) => (
                    <div key={user.user_id} className="text-sm text-white">
                      <strong>{user.full_name || 'Unnamed User'}</strong>
                      <br />
                      <span className="text-gray-300">Role: {user.role}</span>
                      {user.is_super_admin && <span className="text-purple-400 ml-2">(Super Admin)</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Button
              onClick={handlePromoteToAdmin}
              disabled={isPromotingAdmin}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {isPromotingAdmin ? "Promoting..." : "Promote to Admin"}
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
              disabled={isPromotingSuperAdmin}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {isPromotingSuperAdmin ? "Promoting..." : "Promote to Super Admin"}
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
