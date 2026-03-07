import { TYPING } from '../constants';
import { Avatar } from './ui';

export function TypingIndicator() {
  return (
    <div className="animate-fade-in inline-flex gap-3 sm:gap-5">
      <div className="loading-glow shrink-0">
        <Avatar />
      </div>
      <div className="assistant-bubble flex items-center gap-1 select-none">
        <span className="gradient-text dots">{TYPING.THINKING}</span>
        <span className="typing-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </span>
      </div>
    </div>
  );
}
