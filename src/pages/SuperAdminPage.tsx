
import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import UserManagement from "@/components/admin/UserManagement";
import SuperAdminPanel from "@/components/admin/SuperAdminPanel";
import InviteManagement from "@/components/admin/InviteManagement";
import { 
  Users, 
  Crown,
  Gift,
  Activity,
  Shield
} from "lucide-react";

const SuperAdminPage = () => {
  const { user } = useAuth();

  const { data: isSuperAdmin } = useQuery({
    queryKey: ["is-super-admin", user?.id],
    queryFn: async () => {
      if (!user) return false;
      
      const { data, error } = await supabase
        .from("super_admins")
        .select("id")
        .eq("id", user.id)
        .single();
      
      if (error) return false;
      return !!data;
    },
    enabled: !!user
  });

  if (!isSuperAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-red-400">You don't have SuperAdmin privileges.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-12 h-12 text-yellow-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">
              SuperAdmin Control Center
            </h1>
          </div>
          <p className="text-gray-400">
            Complete control over the Codebird platform and all its features
          </p>
        </motion.div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-black/20">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Crown className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="invites" className="flex items-center gap-2">
              <Gift className="w-4 h-4" />
              Invites
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <SuperAdminPanel />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="invites">
            <InviteManagement />
          </TabsContent>

          <TabsContent value="activity">
            <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">System Activity</h3>
              <p className="text-gray-400">Activity monitoring coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SuperAdminPage;
