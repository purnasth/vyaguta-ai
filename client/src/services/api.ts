import axios from "axios";
import type { ChatRequest, ChatResponse, QuickQuestion } from "../types";

const API_BASE_URL = "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const chatApi = {
  /**
   * Send a message to the AI and get a response
   */
  sendMessage: async (request: ChatRequest): Promise<ChatResponse> => {
    const response = await api.post<ChatResponse>("/chat", request);
    return response.data;
  },

  /**
   * Get the list of quick questions
   */
  getQuickQuestions: async (): Promise<QuickQuestion[]> => {
    const response = await api.get<{ questions: QuickQuestion[] }>(
      "/quick-questions",
    );
    return response.data.questions;
  },

  /**
   * Get a surprise question
   */
  getSurpriseQuestion: async (index?: number): Promise<string> => {
    const params = index !== undefined ? { index } : {};
    const response = await api.get<{ question: string }>("/surprise", {
      params,
    });
    return response.data.question;
  },

  /**
   * Health check
   */
  healthCheck: async (): Promise<boolean> => {
    try {
      const response = await api.get("/health");
      return response.data.status === "healthy";
    } catch {
      return false;
    }
  },
};

export default api;
