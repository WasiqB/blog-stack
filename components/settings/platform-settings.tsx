"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { PlatformConnectModal } from './platform-connect-modal';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export function PlatformSettings() {
  const [platforms, setPlatforms] = useState({
    medium: false,
    hashnode: false,
  });
  const [connectingPlatform, setConnectingPlatform] = useState<'medium' | 'hashnode' | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchPlatformStatus();
  }, []);

  const fetchPlatformStatus = async () => {
    try {
      const { data } = await supabase
        .from('platform_tokens')
        .select('platform')
        .in('platform', ['medium', 'hashnode']);

      const connected = {
        medium: false,
        hashnode: false,
      };

      data?.forEach(({ platform }) => {
        connected[platform as keyof typeof connected] = true;
      });

      setPlatforms(connected);
    } catch (error) {
      console.error('Error fetching platform status:', error);
    }
  };

  const handleDisconnect = async (platform: 'medium' | 'hashnode') => {
    try {
      const { error } = await supabase
        .from('platform_tokens')
        .delete()
        .eq('platform', platform);

      if (error) throw error;

      setPlatforms(prev => ({ ...prev, [platform]: false }));
      toast.success(`${platform} account disconnected`);
    } catch (error: any) {
      toast.error(`Failed to disconnect ${platform}: ${error.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Medium</CardTitle>
          <CardDescription>
            Connect your Medium account to publish stories directly from BlogSync
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Switch
              id="medium"
              checked={platforms.medium}
              onCheckedChange={(checked) => {
                if (!checked) handleDisconnect('medium');
                else setConnectingPlatform('medium');
              }}
            />
            <Label htmlFor="medium">Enable Medium Integration</Label>
          </div>
          <Button
            variant="outline"
            onClick={() => setConnectingPlatform('medium')}
            disabled={platforms.medium}
          >
            {platforms.medium ? 'Connected' : 'Connect Account'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hashnode</CardTitle>
          <CardDescription>
            Connect your Hashnode blog to cross-post articles automatically
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Switch
              id="hashnode"
              checked={platforms.hashnode}
              onCheckedChange={(checked) => {
                if (!checked) handleDisconnect('hashnode');
                else setConnectingPlatform('hashnode');
              }}
            />
            <Label htmlFor="hashnode">Enable Hashnode Integration</Label>
          </div>
          <Button
            variant="outline"
            onClick={() => setConnectingPlatform('hashnode')}
            disabled={platforms.hashnode}
          >
            {platforms.hashnode ? 'Connected' : 'Connect Account'}
          </Button>
        </CardContent>
      </Card>

      {connectingPlatform && (
        <PlatformConnectModal
          platform={connectingPlatform}
          isOpen={true}
          onClose={() => setConnectingPlatform(null)}
          onSuccess={() => {
            setPlatforms(prev => ({ ...prev, [connectingPlatform]: true }));
          }}
        />
      )}
    </div>
  );
}