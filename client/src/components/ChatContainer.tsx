import { useRef, useEffect } from 'react';

import type { Message, QuickQuestion } from '../types';

import {
  ChatInput,
  MessageBubble,
  WelcomeMessage,
  TypingIndicator,
} from './index';

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (content: string) => void;
  onSurprise: () => void;
  quickQuestions: QuickQuestion[];
  sidebarOpen: boolean;
  sidebarWidth: number;
}

export function ChatContainer({
  messages,
  isLoading,
  onSendMessage,
  onSurprise,
  quickQuestions,
  sidebarOpen,
  sidebarWidth,
}: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <main
      className="chat-wrapper ml-auto flex max-h-screen flex-1 flex-col"
      style={{ width: sidebarOpen ? `calc(100% - ${sidebarWidth}px)` : '100%' }}
    >
      <div className="overflow-y-auto px-4 py-6">
        <div className="flex-1">
          <div className="mx-auto max-w-6xl space-y-4">
            {messages.length === 0 ? (
              <WelcomeMessage />
            ) : (
              <div className="px-3 pt-12 pb-48 text-sm sm:px-2 xl:pt-16 xl:pb-64">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
                {isLoading && <TypingIndicator />}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      <div className="fixed bottom-3 left-1/2 mx-auto w-[95%] max-w-162.5 -translate-x-1/2 rounded-3xl border border-white/10 p-3 shadow-[inset_0_4px_8px_rgba(255,255,255,0.2)] backdrop-blur-md md:w-3/4 xl:w-2/5">
        {isLoading && <div className="loading-glow-indicator"></div>}
        <div className="mx-auto max-w-4xl">
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
