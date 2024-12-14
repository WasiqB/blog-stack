"use client"

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { connectHashnode } from '@/lib/platform/hashnode';
import { getMediumAuthUrl } from '@/lib/platform/medium';
import { toast } from 'sonner';

interface PlatformConnectModalProps {
  platform: 'medium' | 'hashnode';
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function PlatformConnectModal({
  platform,
  isOpen,
  onClose,
  onSuccess,
}: PlatformConnectModalProps) {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      if (platform === 'medium') {
        const authUrl = await getMediumAuthUrl();
        window.location.href = authUrl;
      } else {
        await connectHashnode(token);
        toast.success('Hashnode account connected successfully');
        onSuccess();
        onClose();
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Connect {platform === 'medium' ? 'Medium' : 'Hashnode'} Account
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {platform === 'hashnode' ? (
            <div className="space-y-2">
              <Label htmlFor="token">API Token</Label>
              <Input
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter your Hashnode API token"
              />
              <p className="text-sm text-muted-foreground">
                You can find your API token in your Hashnode account settings
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              You will be redirected to Medium to authorize BlogSync
            </p>
          )}

          <Button
            onClick={handleConnect}
            disabled={platform === 'hashnode' && !token || isLoading}
            className="w-full"
          >
            {isLoading ? 'Connecting...' : 'Connect Account'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}