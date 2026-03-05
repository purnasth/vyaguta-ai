export * from './strings';

export * from './assets';

// TODO: filter these unnecessary constants and split into separate files if needed
// Storage keys
export const STORAGE_KEYS = {
  CONVERSATIONS: 'vyaguta_conversations',
  USER_PREFERENCES: 'vyaguta_preferences',
  SIDEBAR_STATE: 'vyaguta_sidebar_open',
} as const;

// Default values
export const DEFAULTS = {
  CONVERSATION_NAME: 'New Chat',
  MAX_CONVERSATION_NAME_LENGTH: 30,
} as const;

// Message roles
export const MESSAGE_ROLES = {
  USER: 'user',
  ASSISTANT: 'assistant',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  SEND_MESSAGE:
    "I apologize, but I'm experiencing technical difficulties. Please try again or contact support if the issue persists.",
  PARSE_STORAGE: 'Failed to parse stored conversations',
  SURPRISE_QUESTION: 'Error getting surprise question',
} as const;

// Time constants (in milliseconds)
export const TIME = {
  MS_PER_DAY: 1000 * 60 * 60 * 24,
  DAYS_IN_WEEK: 7,
} as const;

// UI constants
export const UI = {
  COPY_FEEDBACK_TIMEOUT: 2000,
  MAX_MESSAGE_WIDTH_MOBILE: '80%',
  MAX_MESSAGE_WIDTH_DESKTOP: '70%',
  SIDEBAR_WIDTH_DEFAULT: 288,
  SIDEBAR_WIDTH_MIN: 240,
  SIDEBAR_WIDTH_MAX: 480,
  AVATAR_SIZE: 40,
  AVATAR_SIZE_SM: 32,
  HEADER_HEIGHT: 64,
} as const;
