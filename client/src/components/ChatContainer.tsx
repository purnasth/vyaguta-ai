import { useRef, useEffect } from "react";
import { TbMenu2 } from "react-icons/tb";

import { UI } from "@/constants";

import type { Message, QuickQuestion } from "../types";

import { ChatInput } from "./ChatInput";
import { MessageBubble } from "./MessageBubble";
import { WelcomeMessage } from "./WelcomeMessage";
import { TypingIndicator } from "./TypingIndicator";

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sidebarWidth = UI.SIDEBAR_WIDTH_DEFAULT;
  return (
    <main
      className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "ml-0" : "ml-0"} ml-auto`}
      style={{ width: `calc(100% - ${sidebarWidth}px)` }}
    >
      <header className="absolute top-3 left-3 z-40">
        {!sidebarOpen && (
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <TbMenu2 className="text-xl" />
          </button>
        )}
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-6xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <WelcomeMessage />
          ) : (
            <div className="pt-16 pb-48">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </div>
          )}

          {isLoading && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* TODO: add the inner shadow after tailwind 4 */}
      <div className="chat-container border border-white/10 backdrop-blur-md p-3 mx-auto w-2/5 rounded-3xl mb-3 fixed left-1/2 -translate-x-1/2 bottom-0">
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
