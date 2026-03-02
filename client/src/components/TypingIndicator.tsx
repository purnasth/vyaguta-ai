import { TYPING, IMAGES, ALT_TEXT } from "../constants";

export function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden border-2 border-vyaguta-secondary loading-glow">
        <img
          src={IMAGES.APP_AVATAR}
          alt={ALT_TEXT.ASSISTANT_AVATAR}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="assistant-bubble px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="gradient-text font-medium">{TYPING.THINKING}</span>
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-vyaguta-primary rounded-full typing-dot"></span>
            <span className="w-2 h-2 bg-vyaguta-primary rounded-full typing-dot"></span>
            <span className="w-2 h-2 bg-vyaguta-primary rounded-full typing-dot"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
