"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";

interface ScheduleModalProps {
  onSchedule: (
    date: Date,
    platforms: { medium: boolean; hashnode: boolean }
  ) => void;
}

export function ScheduleModal({ onSchedule }: ScheduleModalProps) {
  const [date, setDate] = useState<Date>();
  const [platforms, setPlatforms] = useState({
    medium: false,
    hashnode: false,
  });

  const handleSchedule = () => {
    if (date) {
      onSchedule(date, platforms);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <CalendarIcon className="mr-2 h-4 w-4" />
          Schedule
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule Publication</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Publication Date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={(date) => date < new Date()}
            />
          </div>

          <div className="space-y-4">
            <Label>Publish To</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="medium"
                  checked={platforms.medium}
                  onCheckedChange={(checked) =>
                    setPlatforms((prev) => ({
                      ...prev,
                      medium: checked === true,
                    }))
                  }
                />
                <Label htmlFor="medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hashnode"
                  checked={platforms.hashnode}
                  onCheckedChange={(checked) =>
                    setPlatforms((prev) => ({
                      ...prev,
                      hashnode: checked === true,
                    }))
                  }
                />
                <Label htmlFor="hashnode">Hashnode</Label>
              </div>
            </div>
          </div>

          <Button
            onClick={handleSchedule}
            disabled={!date || (!platforms.medium && !platforms.hashnode)}
            className="w-full"
          >
            Schedule Publication
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
