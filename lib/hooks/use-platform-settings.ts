"use client"

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

interface PlatformSettings {
  medium: boolean;
  hashnode: boolean;
}

export function usePlatformSettings() {
  const [platforms, setPlatforms] = useState<PlatformSettings>({
    medium: false,
    hashnode: false,
  });
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching platform status:', error);
      setIsLoading(false);
    }
  };

  const disconnectPlatform = async (platform: keyof PlatformSettings) => {
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

  return {
    platforms,
    isLoading,
    disconnectPlatform,
    refreshPlatforms: fetchPlatformStatus,
  };
}