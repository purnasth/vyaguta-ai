import { TbBulb } from "react-icons/tb";
import { WELCOME, APP, IMAGES, ALT_TEXT, CHAT_INPUT } from "../constants";

export function WelcomeMessage() {
  return (
    <div className="flex gap-3 mt-24 animate-fade-in text-sm">
      <div className="flex-shrink-0 size-10 rounded-full overflow-hidden border border-white/50 shadow">
        <img
          src={IMAGES.APP_AVATAR}
          alt={ALT_TEXT.APP_LOGO}
          className="size-full object-cover"
          draggable={false}
        />
      </div>
      <div>
        <div className="assistant-bubble">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="animate-wave">{WELCOME.GREETING}</span>
              <span>
                {WELCOME.TITLE}&nbsp;
                <span className="gradient-text">{APP.NAME}</span>&nbsp;
                {WELCOME.SUBTITLE}
              </span>
            </div>

            <p className="leading-relaxed">{WELCOME.DESCRIPTION}</p>

            <div>
              <p className="mt-12 text-vyaguta-primary font-medium mb-2">
                {WELCOME.ASK_ABOUT}
              </p>
              <ul className="space-y-1">
                {WELCOME.FEATURES.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 ml-2">
                    <span className="size-1.5 border border-white rounded-full"></span>
                    {feature.text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 w-fit !mt-8 rounded-lg px-4 py-3 border border-white/10">
              <TbBulb className="inline-block mr-2 align-middle" />
              <span>
                {WELCOME.TIP_TEXT}&nbsp;
                <span className="text-vyaguta-primary font-medium">
                  {CHAT_INPUT.QUICK_QUESTIONS}
                </span>
                &nbsp;
                {WELCOME.TIP_OR}&nbsp;
                <span className="text-vyaguta-secondary font-medium">
                  {CHAT_INPUT.SURPRISE_ME}
                </span>
                &nbsp;
                {WELCOME.TIP_SUFFIX}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
