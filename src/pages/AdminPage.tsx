
import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import UserManagement from "@/components/admin/UserManagement";
import SuperAdminPanel from "@/components/admin/SuperAdminPanel";
import { 
  Users, 
  Calendar, 
  FileText, 
  Crown,
  Settings,
  Activity
} from "lucide-react";

const AdminPage = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            {isSuperAdmin ? "Super Admin" : "Admin"} Dashboard
          </h1>
          <p className="text-gray-400">
            {isSuperAdmin 
              ? "Complete control over the platform and all its features" 
              : "Manage events, content, and user interactions"
            }
          </p>
        </motion.div>

        <Tabs defaultValue={isSuperAdmin ? "super-admin" : "users"} className="w-full">
          <TabsList className={`grid w-full ${isSuperAdmin ? 'grid-cols-2' : 'grid-cols-1'} bg-black/20`}>
            {isSuperAdmin && (
              <TabsTrigger value="super-admin" className="flex items-center gap-2">
                <Crown className="w-4 h-4" />
                Super Admin
              </TabsTrigger>
            )}
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
          </TabsList>

          {isSuperAdmin && (
            <TabsContent value="super-admin">
              <SuperAdminPanel />
            </TabsContent>
          )}

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
