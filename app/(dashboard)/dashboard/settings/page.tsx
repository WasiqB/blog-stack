"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProfileForm } from "@/components/settings/profile/profile-form";
import { AvatarUpload } from "@/components/settings/profile/avatar-upload";
import { PasswordForm } from "@/components/settings/security/password-form";
import { PlatformCard } from "@/components/settings/platforms/platform-card";
import { PlatformConnectModal } from "@/components/settings/platforms/platform-connect-modal";
import { User, Settings2, Shield } from "lucide-react";
import { useState } from "react";
import { usePlatformSettings } from "@/lib/hooks/use-platform-settings";

export default function SettingsPage() {
  const [connectingPlatform, setConnectingPlatform] = useState<
    "medium" | "hashnode" | null
  >(null);
  const { platforms, disconnectPlatform, refreshPlatforms } =
    usePlatformSettings();

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
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Manage your personal information and public profile
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <AvatarUpload />
              <ProfileForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-6">
          <PlatformCard
            title="Medium"
            description="Connect your Medium account to publish stories directly from BlogSync"
            isConnected={platforms.medium}
            onConnect={() => setConnectingPlatform("medium")}
            onDisconnect={() => disconnectPlatform("medium")}
          />
          <PlatformCard
            title="Hashnode"
            description="Connect your Hashnode blog to cross-post articles automatically"
            isConnected={platforms.hashnode}
            onConnect={() => setConnectingPlatform("hashnode")}
            onDisconnect={() => disconnectPlatform("hashnode")}
          />
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your password and account security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PasswordForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {connectingPlatform && (
        <PlatformConnectModal
          platform={connectingPlatform}
          isOpen={true}
          onClose={() => setConnectingPlatform(null)}
          onSuccess={refreshPlatforms}
        />
      )}
    </div>
  );
}
