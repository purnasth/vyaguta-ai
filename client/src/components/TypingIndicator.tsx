import { TYPING } from '../constants';
import { Avatar } from './ui';

export function TypingIndicator() {
  return (
    <div className="animate-fade-in flex gap-3">
      <div className="loading-glow shrink-0">
        <Avatar />
      </div>
      <div className="assistant-bubble px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="gradient-text">{TYPING.THINKING}</span>
          <div className="flex gap-1">
            <span className="typing-dot h-2 w-2 rounded-full bg-red-600"></span>
            <span className="typing-dot h-2 w-2 rounded-full bg-red-600"></span>
            <span className="typing-dot h-2 w-2 rounded-full bg-red-600"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
