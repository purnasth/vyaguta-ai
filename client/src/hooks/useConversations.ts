/**
 * Custom hook for managing conversations
 */

import { useState, useCallback, useMemo } from "react";
import type { ChatSession, Message } from "../types";
import { STORAGE_KEYS, ERROR_MESSAGES } from "../constants";
import { useLocalStorage } from "./useLocalStorage";
import {
  createConversation,
  addMessageToConversation,
  clearConversation as clearConv,
  renameConversation as renameConv,
} from "../utils/conversation";
import {
  createUserMessage,
  createAssistantMessage,
  createErrorMessage,
  filterMessagesBySearch,
} from "../utils/message";
import { chatApi } from "../services/api";

interface UseConversationsReturn {
  // State
  conversations: ChatSession[];
  activeConversation: ChatSession | undefined;
  activeConversationId: string | null;
  messages: Message[];
  isLoading: boolean;

  // Actions
  createNewChat: () => void;
  selectConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  renameConversation: (id: string, name: string) => void;
  clearConversation: () => void;
  sendMessage: (content: string) => Promise<void>;

  // Utilities
  getFilteredMessages: (searchTerm: string) => Message[];
}

export function useConversations(): UseConversationsReturn {
  const [conversations, setConversations] = useLocalStorage<ChatSession[]>(
    STORAGE_KEYS.CONVERSATIONS,
    [],
  );
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(() => {
    // Initialize with first conversation if exists
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
      if (stored) {
        const parsed = JSON.parse(stored) as ChatSession[];
        return parsed.length > 0 ? parsed[0].id : null;
      }
    } catch {
      // Ignore parse errors
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(false);

  // Derived state
  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === activeConversationId),
    [conversations, activeConversationId],
  );

  const messages = useMemo(
    () => activeConversation?.messages || [],
    [activeConversation],
  );

  // Create new chat
  const createNewChat = useCallback(() => {
    const newConversation = createConversation();
    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
  }, [setConversations]);

  // Select conversation
  const selectConversation = useCallback((id: string) => {
    setActiveConversationId(id);
  }, []);

  // Delete conversation
  const deleteConversation = useCallback(
    (id: string) => {
      setConversations((prev) => {
        const filtered = prev.filter((c) => c.id !== id);
        if (activeConversationId === id) {
          setActiveConversationId(filtered.length > 0 ? filtered[0].id : null);
        }
        return filtered;
      });
    },
    [activeConversationId, setConversations],
  );

  // Rename conversation
  const renameConversation = useCallback(
    (id: string, name: string) => {
      setConversations((prev) =>
        prev.map((c) => (c.id === id ? renameConv(c, name) : c)),
      );
    },
    [setConversations],
  );

  // Clear current conversation
  const clearConversation = useCallback(() => {
    if (activeConversationId) {
      setConversations((prev) =>
        prev.map((c) => (c.id === activeConversationId ? clearConv(c) : c)),
      );
    }
  }, [activeConversationId, setConversations]);

  // Send message
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      // Create new conversation if none exists
      let currentId = activeConversationId;
      if (!currentId) {
        const newConversation = createConversation();
        setConversations((prev) => [newConversation, ...prev]);
        setActiveConversationId(newConversation.id);
        currentId = newConversation.id;
      }

      const userMessage = createUserMessage(content);

      // Add user message to conversation
      setConversations((prev) =>
        prev.map((c) =>
          c.id === currentId
            ? addMessageToConversation(c, userMessage, true)
            : c,
        ),
      );

      setIsLoading(true);

      try {
        // Get current messages for history
        const currentConversation = conversations.find(
          (c) => c.id === currentId,
        );
        const currentMessages = currentConversation?.messages || [];

        const response = await chatApi.sendMessage({
          message: content.trim(),
          history: [...currentMessages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
            timestamp: m.timestamp,
          })),
        });

        const assistantMessage = createAssistantMessage(
          response.response,
          response.sources,
        );

        setConversations((prev) =>
          prev.map((c) =>
            c.id === currentId
              ? addMessageToConversation(c, assistantMessage)
              : c,
          ),
        );
      } catch (error) {
        console.error(ERROR_MESSAGES.SEND_MESSAGE, error);
        const errorMessage = createErrorMessage();
        setConversations((prev) =>
          prev.map((c) =>
            c.id === currentId ? addMessageToConversation(c, errorMessage) : c,
          ),
        );
      } finally {
        setIsLoading(false);
      }
    },
    [activeConversationId, conversations, isLoading, setConversations],
  );

  // Get filtered messages
  const getFilteredMessages = useCallback(
    (searchTerm: string) => filterMessagesBySearch(messages, searchTerm),
    [messages],
  );

  return {
    conversations,
    activeConversation,
    activeConversationId,
    messages,
    isLoading,
    createNewChat,
    selectConversation,
    deleteConversation,
    renameConversation,
    clearConversation,
    sendMessage,
    getFilteredMessages,
  };
}
