import { useRef, useEffect } from "react";
import { MessageBubble } from "./MessageBubble";
import { WelcomeMessage } from "./WelcomeMessage";
import { TypingIndicator } from "./TypingIndicator";
import { ChatInput } from "./ChatInput";
import { Menu } from "lucide-react";
import type { Message, QuickQuestion } from "../types";
import { APP, IMAGES, ALT_TEXT } from "../constants";

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (content: string) => void;
  onSurprise: () => void;
  quickQuestions: QuickQuestion[];
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function ChatContainer({
  messages,
  isLoading,
  onSendMessage,
  onSurprise,
  quickQuestions,
  sidebarOpen,
  onToggleSidebar,
}: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <main
      className={`flex-1 flex flex-col h-screen transition-all duration-300 ${sidebarOpen ? "ml-0" : "ml-0"}`}
    >
      {/* Header */}
      <header className="flex-shrink-0 h-16 border-b border-white/10 bg-vyaguta-dark/80 backdrop-blur-md px-4 flex items-center gap-4">
        {!sidebarOpen && (
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div className="flex items-center gap-3">
          <img
            src={IMAGES.APP_AVATAR}
            alt={ALT_TEXT.APP_LOGO}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <h1 className="font-semibold text-white">{APP.NAME}</h1>
            <p className="text-xs text-gray-400">{APP.TAGLINE}</p>
          </div>
        </div>
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <WelcomeMessage />
          ) : (
            messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))
          )}

          {isLoading && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 border border-white/10 backdrop-blur-md p-3 mx-auto w-1/2 rounded-3xl mb-3">
        <div className="max-w-4xl mx-auto">
          <ChatInput
            onSend={onSendMessage}
            onSurprise={onSurprise}
            quickQuestions={quickQuestions}
            disabled={isLoading}
          />
        </div>
      </div>
    </main>
  );
}
