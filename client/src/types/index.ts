export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  sources?: string[];
}

export interface HistoryMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export interface ChatSession {
  id: string;
  name: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface QuickQuestion {
  id: number;
  question: string;
}

export interface ChatRequest {
  message: string;
  history?: HistoryMessage[];
  model?: string;
}

export interface ChatResponse {
  response: string;
  timestamp: string;
  sources?: string[];
}

export interface UserPreferences {
  theme: "dark" | "light";
  typingAnimation: boolean;
  soundEffects: boolean;
}

export interface MessageStats {
  totalMessages: number;
  userMessages: number;
  assistantMessages: number;
  sessionStart: string;
}
