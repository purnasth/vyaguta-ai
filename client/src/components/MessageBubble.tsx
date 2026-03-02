import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Copy, Check } from "lucide-react";

import type { Message } from "../types";
import { MESSAGE, IMAGES, ALT_TEXT, UI } from "../constants";

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
  if (message.role === "user") {
    return (
      <div className="flex justify-end gap-3 animate-fade-in">
        <div className="max-w-[80%] lg:max-w-[70%]">
          <div className="user-bubble px-4 py-3 text-white">
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
          <p className="text-xs text-gray-500 mt-1 text-right">
            {message.timestamp}
          </p>
        </div>
        <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden border-2 border-vyaguta-primary">
          <img
            src={IMAGES.USER_AVATAR}
            alt={ALT_TEXT.USER_AVATAR}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 animate-slide-up mt-2 mb-10">
      <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden border-2 border-vyaguta-secondary">
        <img
          src={IMAGES.APP_AVATAR}
          alt={ALT_TEXT.ASSISTANT_AVATAR}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="max-w-[80%] lg:max-w-[70%] px-2">
        <div className="assistant-bubble">
          <div className="markdown-content">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-xs text-gray-500">{message.timestamp}</p>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" />
                <span>{MESSAGE.COPIED}</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>{MESSAGE.COPY}</span>
              </>
            )}
          </button>
          {message.sources && message.sources.length > 0 && (
            <span className="text-xs text-gray-600">
              {MESSAGE.SOURCES} {message.sources.join(", ")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
