"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface PlatformCardProps {
  title: string;
  description: string;
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export function PlatformCard({
  title,
  description,
  isConnected,
  onConnect,
  onDisconnect,
}: PlatformCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Switch
            id={title.toLowerCase()}
            checked={isConnected}
            onCheckedChange={(checked) => {
              if (!checked) onDisconnect();
              else onConnect();
            }}
          />
          <Label htmlFor={title.toLowerCase()}>
            Enable {title} Integration
          </Label>
        </div>
        <Button variant="outline" onClick={onConnect} disabled={isConnected}>
          {isConnected ? "Connected" : "Connect Account"}
        </Button>
      </CardContent>
    </Card>
  );
}
