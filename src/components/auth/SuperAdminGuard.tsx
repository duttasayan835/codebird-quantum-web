
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface SuperAdminGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const SuperAdminGuard: React.FC<SuperAdminGuardProps> = ({ children, fallback }) => {
  const { user } = useAuth();

  const { data: isSuperAdmin, isLoading } = useQuery({
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isSuperAdmin) {
    return fallback ? <>{fallback}</> : (
      <div className="text-center p-8">
        <h3 className="text-xl font-semibold text-red-400 mb-2">Access Denied</h3>
        <p className="text-gray-400">This section requires Super Admin privileges.</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default SuperAdminGuard;
