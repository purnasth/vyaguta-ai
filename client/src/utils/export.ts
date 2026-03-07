/**
 * Export utilities
 */

import type { ChatSession } from "../types";
import { getCurrentISOString, getDateForFilename } from "./date";

interface ExportData {
  session: string;
  messages: ChatSession["messages"];
  exportedAt: string;
}

/**
 * Export chat as JSON file
 */
export function exportChatAsJson(conversation: ChatSession): void {
  const chatData: ExportData = {
    session: conversation.name,
    messages: conversation.messages,
    exportedAt: getCurrentISOString(),
  };

  const blob = new Blob([JSON.stringify(chatData, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `vyaguta_chat_${getDateForFilename()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}
