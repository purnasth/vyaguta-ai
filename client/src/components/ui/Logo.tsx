import { Link } from 'react-router-dom';

import { APP } from '@/constants';

import { Avatar } from './Avatar';

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-3">
      <Avatar />
      <h2 className="text-lg font-light">{APP.NAME}</h2>
    </Link>
  );
};
