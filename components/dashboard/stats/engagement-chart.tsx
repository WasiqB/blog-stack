"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface EngagementData {
  date: string;
  views: number;
  comments: number;
}

interface EngagementChartProps {
  data: EngagementData[];
}

export function EngagementChart({ data }: EngagementChartProps) {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Engagement Overview</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="views"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="comments"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
