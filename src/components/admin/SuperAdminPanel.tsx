
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  Settings, 
  Users, 
  FileText, 
  Calendar, 
  FolderOpen, 
  Image, 
  Mail,
  Shield,
  Activity
} from "lucide-react";
import SuperAdminGuard from "@/components/auth/SuperAdminGuard";
import { useAdminOperations, useAuditLogs } from "@/hooks/useAdminOperations";

const SuperAdminPanel = () => {
  const [siteSettings, setSiteSettings] = useState({
    siteName: "",
    siteDescription: "",
    contactEmail: "",
    contactPhone: "",
    address: ""
  });

  const { logActivity } = useAdminOperations();
  const { data: auditLogs, isLoading: isLoadingLogs } = useAuditLogs();

  const updateSiteSettings = async () => {
    try {
      for (const [key, value] of Object.entries(siteSettings)) {
        const { error } = await supabase
          .from("site_settings")
          .upsert({
            setting_key: key,
            setting_value: value
          }, { 
            onConflict: 'setting_key' 
          });

        if (error) throw error;
      }

      await logActivity('update_site_settings', 'Updated site settings');
      toast.success("Site settings updated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to update site settings");
    }
  };

  const bulkUserAction = async (action: 'block' | 'unblock', userIds: string[]) => {
    try {
      for (const userId of userIds) {
        const { error } = await supabase
          .from("profiles")
          .update({ blocked: action === 'block' })
          .eq("id", userId);

        if (error) throw error;
      }

      await logActivity(
        `bulk_${action}_users`,
        `${action === 'block' ? 'Blocked' : 'Unblocked'} ${userIds.length} users`
      );

      toast.success(`Successfully ${action}ed ${userIds.length} users`);
    } catch (error: any) {
      toast.error(error.message || `Failed to ${action} users`);
    }
  };

  return (
    <SuperAdminGuard>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Super Admin Control Panel</h1>
          <p className="text-gray-400">Complete control over the platform</p>
        </motion.div>

        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-black/20">
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Audit Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-6">
            <Card className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
              <h3 className="text-xl font-semibold text-white mb-4">Site Configuration</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="siteName" className="text-white">Site Name</Label>
                  <Input
                    id="siteName"
                    value={siteSettings.siteName}
                    onChange={(e) => setSiteSettings(prev => ({ ...prev, siteName: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="siteDescription" className="text-white">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={siteSettings.siteDescription}
                    onChange={(e) => setSiteSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail" className="text-white">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={siteSettings.contactEmail}
                    onChange={(e) => setSiteSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <Button 
                  onClick={updateSiteSettings}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  Update Settings
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="p-6 bg-gradient-to-r from-green-500/10 to-cyan-500/10 border-green-500/20">
              <h3 className="text-xl font-semibold text-white mb-4">User Management</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => bulkUserAction('block', [])}
                    variant="outline"
                    className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                  >
                    Block Selected Users
                  </Button>
                  <Button
                    onClick={() => bulkUserAction('unblock', [])}
                    variant="outline"
                    className="border-green-500/20 text-green-400 hover:bg-green-500/10"
                  >
                    Unblock Selected Users
                  </Button>
                  <Button
                    variant="outline"
                    className="border-blue-500/20 text-blue-400 hover:bg-blue-500/10"
                  >
                    Export User Data
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "About Page", icon: FileText, color: "blue" },
                { name: "Team Page", icon: Users, color: "green" },
                { name: "Projects", icon: FolderOpen, color: "purple" },
                { name: "Events", icon: Calendar, color: "orange" },
                { name: "Resources", icon: FileText, color: "cyan" },
                { name: "Blog", icon: FileText, color: "pink" },
                { name: "Gallery", icon: Image, color: "yellow" },
                { name: "Contact", icon: Mail, color: "red" }
              ].map((item) => (
                <Card key={item.name} className={`p-6 bg-gradient-to-r from-${item.color}-500/10 to-${item.color}-600/10 border-${item.color}-500/20 cursor-pointer hover:scale-105 transition-transform`}>
                  <div className="flex items-center gap-3 mb-4">
                    <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                    <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">Manage {item.name.toLowerCase()} content and settings</p>
                  <Button size="sm" className={`bg-gradient-to-r from-${item.color}-500 to-${item.color}-600`}>
                    Edit Content
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="p-6 bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/20">
              <h3 className="text-xl font-semibold text-white mb-4">Security Controls</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                  >
                    Force Password Reset (All Users)
                  </Button>
                  <Button
                    variant="outline"
                    className="border-orange-500/20 text-orange-400 hover:bg-orange-500/10"
                  >
                    Revoke All Sessions
                  </Button>
                  <Button
                    variant="outline"
                    className="border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/10"
                  >
                    Enable Maintenance Mode
                  </Button>
                  <Button
                    variant="outline"
                    className="border-purple-500/20 text-purple-400 hover:bg-purple-500/10"
                  >
                    Generate Security Report
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            <Card className="p-6 bg-gradient-to-r from-gray-500/10 to-slate-500/10 border-gray-500/20">
              <h3 className="text-xl font-semibold text-white mb-4">Audit Logs</h3>
              <div className="space-y-4">
                {isLoadingLogs ? (
                  <div className="flex items-center justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <div className="max-h-96 overflow-y-auto space-y-2">
                    {auditLogs?.map((log) => (
                      <div key={log.id} className="p-3 bg-black/20 rounded border border-gray-500/20">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-white font-medium">{log.action_type}</p>
                            <p className="text-gray-400 text-sm">{log.description}</p>
                            <p className="text-gray-500 text-xs">
                              by {log.profiles?.full_name || log.profiles?.email || 'Unknown'}
                            </p>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(log.created_at).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SuperAdminGuard>
  );
};

export default SuperAdminPanel;
