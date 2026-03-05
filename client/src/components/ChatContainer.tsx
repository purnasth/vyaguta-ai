import { useRef, useEffect } from 'react';

import { UI } from '@/constants';

import type { Message, QuickQuestion } from '../types';

import { ChatInput } from './ChatInput';
import { MessageBubble } from './MessageBubble';
import { WelcomeMessage } from './WelcomeMessage';
import { TypingIndicator } from './TypingIndicator';

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (content: string) => void;
  onSurprise: () => void;
  quickQuestions: QuickQuestion[];
  sidebarOpen: boolean;
}

export function ChatContainer({
  messages,
  isLoading,
  onSendMessage,
  onSurprise,
  quickQuestions,
  sidebarOpen,
}: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sidebarWidth = UI.SIDEBAR_WIDTH_DEFAULT;
  return (
    <main
      className="chat-container ml-auto flex max-h-screen flex-1 flex-col"
      style={{ width: sidebarOpen ? `calc(100% - ${sidebarWidth}px)` : '100%' }}
    >
      <div className="overflow-y-auto px-4 py-6">
        <div className="flex-1">
          <div className="mx-auto max-w-6xl space-y-4">
            {messages.length === 0 ? (
              <WelcomeMessage />
            ) : (
              <div className="mt-16 mb-48 text-sm">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
              </div>
            )}

            {isLoading && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* TODO: add the inner shadow after tailwind 4 */}
      <div className="chat-container fixed bottom-0 left-1/2 mx-auto mb-3 w-2/5 -translate-x-1/2 rounded-3xl border border-white/10 p-3 backdrop-blur-md">
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
