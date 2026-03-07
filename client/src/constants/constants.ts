import { SIDEBAR } from './index';

export const APP = {
  NAME: 'Vyaguta AI',
  TAGLINE: 'Your intelligent assistant',
  VERSION: 'v2.0 Vyaguta AI',
} as const;

export const DEFAULTS = {
  CONVERSATION_NAME: SIDEBAR.NEW_CHAT,
  MAX_CONVERSATION_NAME_LENGTH: 30,
} as const;

// Storage keys
export const STORAGE_KEYS = {
  CONVERSATIONS: 'vyaguta_conversations',
  USER_PREFERENCES: 'vyaguta_preferences',
  SIDEBAR_STATE: 'vyaguta_sidebar_open',
} as const;
