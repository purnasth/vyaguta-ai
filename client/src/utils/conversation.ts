/**
 * Conversation utilities
 */

import type { ChatSession, Message } from '../types';
import { DEFAULTS } from '../constants';
import { getCurrentISOString } from './date';

/**
 * Generate a conversation name from messages
 */
export function generateConversationName(messages: Message[]): string {
  if (messages.length === 0) return DEFAULTS.CONVERSATION_NAME;

  const firstUserMessage = messages.find((m) => m.role === 'user');
  if (firstUserMessage) {
    const content = firstUserMessage.content;
    return content.length > DEFAULTS.MAX_CONVERSATION_NAME_LENGTH
      ? content.slice(0, DEFAULTS.MAX_CONVERSATION_NAME_LENGTH) + '...'
      : content;
  }

  return DEFAULTS.CONVERSATION_NAME;
}

/**
 * Create a new conversation
 */
export function createConversation(): ChatSession {
  const now = getCurrentISOString();
  return {
    id: crypto.randomUUID(),
    name: DEFAULTS.CONVERSATION_NAME,
    messages: [],
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Add message to conversation
 */
export function addMessageToConversation(
  conversation: ChatSession,
  message: Message,
  updateName = false,
): ChatSession {
  const newMessages = [...conversation.messages, message];
  return {
    ...conversation,
    messages: newMessages,
    name:
      updateName && conversation.messages.length === 0
        ? generateConversationName(newMessages)
        : conversation.name,
    updatedAt: getCurrentISOString(),
  };
}

/**
 * Clear conversation messages
 */
export function clearConversation(conversation: ChatSession): ChatSession {
  return {
    ...conversation,
    messages: [],
    name: DEFAULTS.CONVERSATION_NAME,
    updatedAt: getCurrentISOString(),
  };
}

/**
 * Rename conversation
 */
export function renameConversation(
  conversation: ChatSession,
  name: string,
): ChatSession {
  return {
    ...conversation,
    name,
    updatedAt: getCurrentISOString(),
  };
}
