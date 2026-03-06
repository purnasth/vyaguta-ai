/**
 * Message creation utilities
 */

import type { Message } from '../types';
import { VYAGUTA_AI_ROLES, ERROR_MESSAGES } from '../constants';
import { formatMessageTime } from './date';

/**
 * Create a user message
 */
export function createUserMessage(content: string): Message {
  return {
    id: crypto.randomUUID(),
    role: VYAGUTA_AI_ROLES.USER,
    content: content.trim(),
    timestamp: formatMessageTime(),
  };
}

/**
 * Create an assistant message
 */
export function createAssistantMessage(
  content: string,
  sources?: string[],
): Message {
  return {
    id: crypto.randomUUID(),
    role: VYAGUTA_AI_ROLES.ASSISTANT,
    content,
    timestamp: formatMessageTime(),
    sources,
  };
}

/**
 * Create an error message (displayed as assistant)
 */
export function createErrorMessage(): Message {
  return createAssistantMessage(ERROR_MESSAGES.SEND_MESSAGE);
}

/**
 * Filter messages by search term
 */
export function filterMessagesBySearch(
  messages: Message[],
  searchTerm: string,
): Message[] {
  if (!searchTerm) return messages;
  const lowerSearch = searchTerm.toLowerCase();
  return messages.filter((m) => m.content.toLowerCase().includes(lowerSearch));
}

/**
 * Count messages by role
 */
export function countMessagesByRole(
  messages: Message[],
  role: 'user' | 'assistant',
): number {
  return messages.filter((m) => m.role === role).length;
}
