import { format, formatDistanceToNow } from "date-fns";

export function formatDate(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "MMM d, yyyy");
}

export function formatRelativeDate(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}

export function formatScheduleDate(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "PPP p");
}
