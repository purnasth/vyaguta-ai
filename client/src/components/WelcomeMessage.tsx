import { TbBulb } from 'react-icons/tb';

import { WELCOME, APP, CHAT_INPUT } from '../constants';

import { Avatar } from './ui';

export function WelcomeMessage() {
  return (
    <div className="animate-fade-in mt-24 flex flex-col gap-3 text-sm sm:flex-row">
      <div className="size-fit shrink-0">
        <Avatar />
      </div>
      <div>
        <div className="assistant-bubble">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="animate-wave text-xl">{WELCOME.GREETING}</span>
              <span>
                {WELCOME.TITLE}&nbsp;
                <span className="gradient-text">{APP.NAME}</span>&nbsp;
                {WELCOME.SUBTITLE}
              </span>
            </div>

            <p className="leading-relaxed">{WELCOME.DESCRIPTION}</p>

            <div>
              <p className="mt-12 mb-2 font-medium text-blue-500">
                {WELCOME.ASK_ABOUT}
              </p>
              <ul className="space-y-1">
                {WELCOME.FEATURES.map((feature, index) => (
                  <li key={index} className="ml-4 flex items-center gap-2">
                    <span className="size-1.5 rounded-full border border-white"></span>
                    {feature.text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-vyaguta-gradient mt-8! w-fit rounded-xl px-3 py-2 text-xs sm:text-sm">
              <TbBulb className="mr-2 inline-block -translate-y-0.5 scale-125 align-middle text-yellow-300" />
              <span>
                {WELCOME.TIP_TEXT}&nbsp;
                <span className="underline">{CHAT_INPUT.QUICK_QUESTIONS}</span>
                &nbsp;
                {WELCOME.TIP_OR}&nbsp;
                <span className="underline">{CHAT_INPUT.SURPRISE_ME}</span>
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
