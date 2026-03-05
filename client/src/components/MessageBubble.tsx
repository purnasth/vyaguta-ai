import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check } from 'lucide-react';

import type { Message } from '../types';
import { ALT_TEXT, IMAGES, MESSAGE, UI } from '../constants';
import { Avatar } from './ui';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), UI.COPY_FEEDBACK_TIMEOUT);
  };

  // TODO: use the enums for the role instead of string literals
  if (message.role === 'user') {
    return (
      <div className="animate-fade-in flex justify-end gap-3">
        <div className="max-w-[80%] lg:max-w-[70%]">
          <div className="user-bubble rounded-3xl rounded-br-none bg-vyaguta-gradient px-4 py-3">
            <p className="mb-0 whitespace-pre-wrap">{message.content}</p>
          </div>
          <p className="mt-1 text-right text-xs text-gray-500">
            {message.timestamp}
          </p>
        </div>
        <div className="shrink-0">
          <img
            src={IMAGES.USER_AVATAR}
            alt={ALT_TEXT.USER_AVATAR}
            className="size-10 rounded-full object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-slide-up mt-2 mb-10 flex gap-3">
      <div className="shrink-0">
        <Avatar />
      </div>
      <div className="max-w-[80%] px-2 lg:max-w-[70%]">
        <div className="assistant-bubble">
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
                <span>{MESSAGE.COPIED}</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>{MESSAGE.COPY}</span>
              </>
            )}
          </button>
          {message.sources && message.sources.length > 0 && (
            <span className="text-xs text-gray-600">
              {MESSAGE.SOURCES} {message.sources.join(', ')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
