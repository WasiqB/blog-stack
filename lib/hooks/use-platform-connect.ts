"use client"

import { useState } from 'react';
import { toast } from 'sonner';

export function usePlatformConnect() {
  const [isConnecting, setIsConnecting] = useState(false);

  const connectMedium = async () => {
    try {
      const response = await fetch('/api/platform/medium/auth-url');
      if (!response.ok) throw new Error('Failed to get auth URL');
      const { url } = await response.json();
      window.location.href = url;
    } catch (error: any) {
      toast.error('Failed to connect Medium: ' + error.message);
    }
  };

  const connectHashnode = async (token: string) => {
    setIsConnecting(true);
    try {
      const response = await fetch('/api/platform/hashnode/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) throw new Error('Failed to connect Hashnode');
      toast.success('Hashnode connected successfully');
    } catch (error: any) {
      toast.error('Failed to connect Hashnode: ' + error.message);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectPlatform = async (platform: 'medium' | 'hashnode') => {
    try {
      const response = await fetch(`/api/platform/${platform}/disconnect`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error(`Failed to disconnect ${platform}`);
      toast.success(`${platform} disconnected successfully`);
    } catch (error: any) {
      toast.error(`Failed to disconnect ${platform}: ` + error.message);
      throw error;
    }
  };

  return {
    isConnecting,
    connectMedium,
    connectHashnode,
    disconnectPlatform,
  };
}