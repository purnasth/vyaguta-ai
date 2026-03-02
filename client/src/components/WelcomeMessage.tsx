import { WELCOME, APP, IMAGES, ALT_TEXT, CHAT_INPUT } from "../constants";

export function WelcomeMessage() {
  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden border-2 border-vyaguta-secondary">
        <img
          src={IMAGES.APP_AVATAR}
          alt={ALT_TEXT.APP_LOGO}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="max-w-[80%] lg:max-w-[70%]">
        <div className="assistant-bubble px-6 py-5">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl animate-wave">{WELCOME.GREETING}</span>
              <span className="text-lg">
                {WELCOME.TITLE}{" "}
                <span className="gradient-text font-bold">{APP.NAME}</span>{" "}
                {WELCOME.SUBTITLE}
              </span>
            </div>

            <p className="text-gray-300 leading-relaxed">
              {WELCOME.DESCRIPTION}
            </p>

            <div>
              <p className="text-vyaguta-primary font-medium mb-2">
                {WELCOME.ASK_ABOUT}
              </p>
              <ul className="space-y-2 text-gray-300">
                {WELCOME.FEATURES.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span>{feature.icon}</span>
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg px-4 py-3 border border-white/10">
              <span className="text-xl mr-2">{WELCOME.TIP_PREFIX}</span>
              <span className="text-gray-300">
                {WELCOME.TIP_TEXT}{" "}
                <span className="text-vyaguta-primary font-medium">
                  {CHAT_INPUT.QUICK_QUESTIONS}
                </span>{" "}
                {WELCOME.TIP_OR}{" "}
                <span className="text-vyaguta-secondary font-medium">
                  {CHAT_INPUT.SURPRISE_ME}
                </span>{" "}
                {WELCOME.TIP_SUFFIX}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
