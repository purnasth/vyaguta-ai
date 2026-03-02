import { GiStarSwirl } from "react-icons/gi";
import { useState, KeyboardEvent } from "react";
import { TbChevronDown, TbSend } from "react-icons/tb";

import { CHAT_INPUT } from "../constants";
import type { QuickQuestion } from "../types";

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
  const [input, setInput] = useState("");
  const [showQuickQuestions, setShowQuickQuestions] = useState(false);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
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
      <div className="bg-white/5 border border-white/5 rounded-xl p-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={CHAT_INPUT.PLACEHOLDER}
          disabled={disabled}
          rows={4}
          className="w-full resize-auto bg-transparent placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm focus:outline-none focus:border-0 ring-0"
        />
        <div className="flex items-center justify-between border-t border-white/10 pt-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setShowQuickQuestions(!showQuickQuestions)}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-sm"
              >
                <span>{CHAT_INPUT.QUICK_QUESTIONS}</span>
                <TbChevronDown
                  className={`transition-transform ${showQuickQuestions ? "rotate-180" : ""}`}
                />
              </button>

              {showQuickQuestions && (
                <div className="absolute bottom-full left-0 mb-2 w-72 max-h-80 overflow-y-auto bg-vyaguta-dark border border-white/10 rounded-xl shadow-xl z-50">
                  {quickQuestions.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => handleQuickQuestion(q.question)}
                      className="w-full text-left px-4 py-3 hover:bg-white/5 text-sm text-gray-300 hover:text-white transition-colors border-b border-white/5 last:border-b-0"
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
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-vyaguta-primary to-vyaguta-secondary hover:opacity-90 disabled:opacity-50 rounded-lg transition-all text-sm font-medium"
            >
              <GiStarSwirl />
              <span>{CHAT_INPUT.SURPRISE_ME}</span>
            </button>
          </div>
          <button
            onClick={handleSend}
            disabled={disabled || !input.trim()}
            className="p-2 bg-vyaguta-primary hover:bg-vyaguta-primary/80 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <TbSend />
          </button>
        </div>
      </div>
    </>
  );
}
