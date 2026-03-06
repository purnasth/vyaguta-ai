// Chat input strings
export const CHAT_INPUT = {
  PLACEHOLDER: 'Ask me anything about Vyaguta...',
  QUICK_QUESTIONS: 'Quick Questions',
  SURPRISE_ME: 'Surprise Me',
} as const;

// Sidebar strings
export const SIDEBAR = {
  SEARCH_PLACEHOLDER: 'Search your chat...',
  NEW_CHAT: 'New Chat',
  CLEAR: 'Clear',
  EXPORT: 'Export',
  CONVERSATIONS: 'Conversations',
  QUICK_LINKS: 'Quick Links',
  PORTAL: 'Portal',
  WIKI: 'Wiki',
  HELP: 'Help',
  GITHUB: 'GitHub',
} as const;

// Welcome message strings
export const WELCOME = {
  GREETING: '👋',
  TITLE: 'Welcome to',
  SUBTITLE: '— your smart assistant!',
  DESCRIPTION:
    "Hello! I am Vyaguta's assistant, here to help you with information about Vyaguta's modules, features, onboarding procedures, tools, policies, coding guidelines, and details related to Vyaguta and Leapfrog. If you have any questions or need assistance, feel free to ask!",
  ASK_ABOUT: 'Ask me about:',
  TIP_PREFIX: '💡',
  TIP_TEXT: 'Try the',
  TIP_OR: 'or',
  TIP_SUFFIX: 'for instant answers!',
  FEATURES: [
    {
      icon: '✨',
      text: 'Vyaguta modules (OKR, Pulse, Attendance, Teams, Core, & more)',
    },
    { icon: '🚀', text: 'Onboarding, GAP & growth programs' },
    { icon: '🛠️', text: 'Tech tools, resources & coding guidelines' },
    { icon: '📅', text: 'Company calendar, policies & perks' },
    { icon: '👥', text: 'Team info, contacts & speak-up channels' },
    { icon: '❓', text: 'Anything about Vyaguta or Leapfrog' },
  ],
} as const;

// Conversation list strings
export const CONVERSATION = {
  NO_CONVERSATIONS: 'No conversations yet',
  START_NEW: 'Start a new chat to begin',
  MESSAGES_LABEL: 'messages',
  RENAME: 'Rename',
  DELETE: 'Delete',
} as const;

// Typing indicator strings
export const TYPING = {
  THINKING: 'Vyaguta AI is thinking',
} as const;

// Alt text for accessibility
export const ALT_TEXT = {
  APP_LOGO: 'Vyaguta AI',
  USER_AVATAR: 'User',
  ASSISTANT_AVATAR: 'Vyaguta AI',
} as const;

// External URLs
export const URLS = {
  VYAGUTA_PORTAL: 'https://vyaguta.lftechnology.com/',
  WIKI: 'https://lftechnology.atlassian.net/wiki/spaces/VYAGUTA/overview',
  SLACK_HELP: 'https://lftechnology.slack.com/archives/CDUAPJSM9',
  GITHUB_REPO: 'https://github.com/purnasth/genai-chatbot',
} as const;
