"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileSettings } from "@/components/settings/profile-settings";
import { PlatformSettings } from "@/components/settings/platform-settings";
import { SecuritySettings } from "@/components/settings/security-settings";
import { User, Settings2, Shield } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="platforms" className="flex items-center gap-2">
            <Settings2 className="h-4 w-4" />
            Platforms
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileSettings />
        </TabsContent>

        <TabsContent value="platforms">
          <PlatformSettings />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
