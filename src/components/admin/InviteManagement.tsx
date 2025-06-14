import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useInviteCodes } from "@/hooks/useInviteCodes";
import { Gift, Copy, Clock, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

const InviteManagement = () => {
  const [newInvite, setNewInvite] = useState({
    role: 'admin' as 'admin' | 'user',
    expiresInDays: 7
  });

  const { createInviteCode, getInviteCodes } = useInviteCodes();
  const { data: inviteCodes, isLoading } = getInviteCodes;

  const handleCreateInvite = async () => {
    try {
      const result = await createInviteCode.mutateAsync(newInvite);
      if (result) {
        toast.success("Invite code created successfully!");
      }
    } catch (error) {
      console.error("Failed to create invite code:", error);
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Invite code copied to clipboard!");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Create New Invite */}
      <Card className="bg-black/20 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Gift className="w-5 h-5 text-purple-400" />
            Create New Invite Code
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="role" className="text-white">Role</Label>
              <Select value={newInvite.role} onValueChange={(value: 'admin' | 'user') => setNewInvite(prev => ({ ...prev, role: value }))}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="expiry" className="text-white">Expires in (days)</Label>
              <Input
                id="expiry"
                type="number"
                min="1"
                max="365"
                value={newInvite.expiresInDays}
                onChange={(e) => setNewInvite(prev => ({ ...prev, expiresInDays: parseInt(e.target.value) }))}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            
            <div className="flex items-end">
              <Button
                onClick={handleCreateInvite}
                disabled={createInviteCode.isPending}
                className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
              >
                {createInviteCode.isPending ? "Creating..." : "Create Invite"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Existing Invite Codes */}
      <Card className="bg-black/20 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Active Invite Codes</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto"></div>
              <p className="text-white/60 mt-2">Loading invite codes...</p>
            </div>
          ) : inviteCodes && inviteCodes.length > 0 ? (
            <div className="space-y-4">
              {inviteCodes.map((invite) => (
                <motion.div
                  key={invite.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 rounded-lg p-4 border border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <code className="bg-black/30 px-3 py-1 rounded text-cyan-400 font-mono">
                          {invite.code}
                        </code>
                        <Badge variant={invite.role === 'admin' ? 'destructive' : 'secondary'}>
                          {invite.role}
                        </Badge>
                        {invite.is_used ? (
                          <Badge variant="outline" className="text-green-400 border-green-400">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Used
                          </Badge>
                        ) : isExpired(invite.expires_at) ? (
                          <Badge variant="outline" className="text-red-400 border-red-400">
                            <XCircle className="w-3 h-3 mr-1" />
                            Expired
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                            <Clock className="w-3 h-3 mr-1" />
                            Active
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-white/60">
                        <p>Created: {formatDate(invite.created_at)}</p>
                        <p>Expires: {formatDate(invite.expires_at)}</p>
                        {invite.used_by && <p>Used by: {invite.used_by}</p>}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(invite.code)}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Gift className="w-12 h-12 text-white/30 mx-auto mb-3" />
              <p className="text-white/60">No invite codes created yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InviteManagement;
