import { GiStarSwirl } from 'react-icons/gi';
import { useState, KeyboardEvent } from 'react';
import { TbChevronDown, TbSend } from 'react-icons/tb';

import { CHAT_INPUT } from '../constants';
import type { QuickQuestion } from '../types';

interface ChatInputProps {
  onSend: (message: string) => void;
  onSurprise: () => void;
  quickQuestions: QuickQuestion[];
  disabled?: boolean;
}

export function ChatInput({
  onSend,
  onSurprise,
  quickQuestions,
  disabled,
}: ChatInputProps) {
  const [input, setInput] = useState('');
  const [showQuickQuestions, setShowQuickQuestions] = useState(false);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickQuestion = (question: string) => {
    onSend(question);
    setShowQuickQuestions(false);
  };

  return (
    <>
      <div className="rounded-xl border border-white/5 bg-white/5 p-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={CHAT_INPUT.PLACEHOLDER}
          disabled={disabled}
          rows={4}
          className="resize-auto w-full bg-transparent text-sm placeholder-gray-500 ring-0 focus:border-0 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        <div className="flex items-center justify-between border-t border-white/10 pt-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setShowQuickQuestions(!showQuickQuestions)}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm transition-colors hover:bg-white/10"
              >
                <span>{CHAT_INPUT.QUICK_QUESTIONS}</span>
                <TbChevronDown
                  className={`transition-transform ${showQuickQuestions ? 'rotate-180' : ''}`}
                />
              </button>

              {showQuickQuestions && (
                <div className="absolute bottom-full left-0 z-50 mb-2 max-h-80 w-72 overflow-y-auto rounded-xl border border-white/10 shadow-xl">
                  {quickQuestions.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => handleQuickQuestion(q.question)}
                      className="w-full border-b border-white/5 px-4 py-3 text-left text-sm text-gray-300 transition-colors last:border-b-0 hover:bg-white/5 hover:text-white"
                    >
                      {q.question}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={onSurprise}
              disabled={disabled}
              className="from-vyaguta-primary to-vyaguta-secondary flex items-center gap-2 rounded-lg bg-gradient-to-r px-4 py-2 text-sm font-medium transition-all hover:opacity-90 disabled:opacity-50"
            >
              <GiStarSwirl />
              <span>{CHAT_INPUT.SURPRISE_ME}</span>
            </button>
          </div>
          <button
            onClick={handleSend}
            disabled={disabled || !input.trim()}
            className="rounded-lg p-2 transition-colors disabled:cursor-not-allowed disabled:bg-gray-600"
          >
            <TbSend />
          </button>
        </div>
      </div>
    </>
  );
}
