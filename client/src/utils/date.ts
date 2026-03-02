/**
 * Date formatting utilities
 */

import { TIME } from "../constants";

/**
 * Format time for display in messages
 */
export function formatMessageTime(date: Date = new Date()): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Format date for conversation list display
 * Shows time for today, "Yesterday" for yesterday, weekday for this week, or date for older
 */
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / TIME.MS_PER_DAY,
  );

  if (diffDays === 0) {
    return formatMessageTime(date);
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < TIME.DAYS_IN_WEEK) {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  } else {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }
}

/**
 * Get current ISO date string
 */
export function getCurrentISOString(): string {
  return new Date().toISOString();
}

/**
 * Get date string for file names (YYYY-MM-DD)
 */
export function getDateForFilename(): string {
  return new Date().toISOString().slice(0, 10);
}
