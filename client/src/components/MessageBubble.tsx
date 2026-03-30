import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check } from 'lucide-react';

import type { Message } from '../types';
import { ALT_TEXT, IMAGES } from '../constants';

import { Avatar } from './ui';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // TODO: use the enums for the role instead of string literals
  if (message.role === 'user') {
    return (
      <div className="animate-fade-in flex justify-end gap-3">
        <div className="max-w-[90%] sm:max-w-[80%] lg:max-w-[70%]">
          <div className="user-bubble bg-vyaguta-gradient rounded-2xl !rounded-br-none px-3 py-2 sm:rounded-3xl sm:px-4 sm:py-3">
            <p className="mb-0 whitespace-pre-wrap">{message.content}</p>
          </div>
          <p className="text-right text-xs text-gray-500 sm:mt-1">
            {message.timestamp}
          </p>
        </div>
        <div className="hidden shrink-0 md:block">
          <img
            src={IMAGES.USER_AVATAR}
            alt={ALT_TEXT.USER_AVATAR}
            className="size-8 rounded-full object-contain sm:size-10"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-slide-up mt-2 mb-10 flex gap-5">
      <div className="hidden shrink-0 md:block">
        <Avatar />
      </div>
      <div className="max-w-[95%] sm:max-w-[80%] lg:max-w-[70%]">
        <div className="assistant-bubble markdown-content">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-xs text-gray-500">{message.timestamp}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-gray-500 transition-colors hover:text-gray-300"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </>
            )}
          </button>
          {message.sources && message.sources.length > 0 && (
            <span className="text-xs text-gray-600">
              Sources: {message.sources.join(', ')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
