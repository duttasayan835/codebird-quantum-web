
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSiteSettings, useUpdateSiteSetting } from "@/hooks/useSiteSettings";
import { Save, Loader2 } from "lucide-react";

export const ContentManagement = () => {
  const { data: settings, isLoading } = useSiteSettings();
  const updateSetting = useUpdateSiteSetting();
  const [formData, setFormData] = useState<Record<string, any>>({});

  React.useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    for (const [key, value] of Object.entries(formData)) {
      if (settings && settings[key] !== value) {
        await updateSetting.mutateAsync({ key, value });
      }
    }
  };

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <Card className="p-6 bg-black/40 backdrop-blur-xl border-white/20">
      <h2 className="text-2xl font-bold text-white mb-6">Site Content Management</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="hero_title" className="text-white">Hero Title</Label>
            <Input
              id="hero_title"
              value={formData.hero_title || ""}
              onChange={(e) => handleInputChange("hero_title", e.target.value)}
              className="bg-black/40 border-white/20 text-white"
            />
          </div>
          
          <div>
            <Label htmlFor="contact_email" className="text-white">Contact Email</Label>
            <Input
              id="contact_email"
              type="email"
              value={formData.contact_email || ""}
              onChange={(e) => handleInputChange("contact_email", e.target.value)}
              className="bg-black/40 border-white/20 text-white"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="hero_subtitle" className="text-white">Hero Subtitle</Label>
          <Textarea
            id="hero_subtitle"
            value={formData.hero_subtitle || ""}
            onChange={(e) => handleInputChange("hero_subtitle", e.target.value)}
            className="bg-black/40 border-white/20 text-white min-h-[100px]"
          />
        </div>

        <div>
          <Label htmlFor="about_text" className="text-white">About Text</Label>
          <Textarea
            id="about_text"
            value={formData.about_text || ""}
            onChange={(e) => handleInputChange("about_text", e.target.value)}
            className="bg-black/40 border-white/20 text-white min-h-[120px]"
          />
        </div>

        <div>
          <Label className="text-white">Social Links</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            {["github", "twitter", "discord"].map((platform) => (
              <div key={platform}>
                <Label htmlFor={platform} className="text-white/70 text-sm capitalize">{platform}</Label>
                <Input
                  id={platform}
                  value={formData.social_links?.[platform] || ""}
                  onChange={(e) => handleInputChange("social_links", {
                    ...formData.social_links,
                    [platform]: e.target.value
                  })}
                  className="bg-black/40 border-white/20 text-white"
                  placeholder={`https://${platform}.com/codebirdclub`}
                />
              </div>
            ))}
          </div>
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            disabled={updateSetting.isPending}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
          >
            {updateSetting.isPending ? (
              <Loader2 className="animate-spin mr-2" size={16} />
            ) : (
              <Save className="mr-2" size={16} />
            )}
            Save Changes
          </Button>
        </motion.div>
      </form>
    </Card>
  );
};
