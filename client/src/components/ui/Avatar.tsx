import { ALT_TEXT, IMAGES } from '@/constants';

export const Avatar = () => {
  return (
    <img
      src={IMAGES.APP_AVATAR}
      alt={ALT_TEXT.APP_LOGO}
      className="size-8 sm:size-10 object-contain"
      draggable={false}
    />
  );
};
