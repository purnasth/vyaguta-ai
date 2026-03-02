import { Link } from "react-router-dom";

import { ALT_TEXT, APP, IMAGES } from "@/constants";

export const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 hover:opacity-80 transition-opacity"
    >
      <img
        src={IMAGES.APP_AVATAR}
        alt={ALT_TEXT.APP_LOGO}
        className="w-10 h-10 rounded-full"
      />
      <h2 className="gradient-text">{APP.NAME}</h2>
    </Link>
  );
};
