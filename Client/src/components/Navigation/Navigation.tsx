import React from 'react';

import BorderedLink from '../ui/links/BorderedLink';
import UsualLink from '../ui/links/UsualLink';
import cl from './Navigation.module.sass';

const Navigation: React.FC<NavigationProps> = ({
  links, type = 'usual', className = '',
}) => (
  <div className={`${cl.nav} ${className}`}>
    {links.map((link) => {
		  if (type === 'bordered') return <BorderedLink link={link} key={link.path} />;
		  return <UsualLink link={link} key={link.path} />;
    })}
  </div>
);

type NavigationProps = {
  links: {
    path: string;
    text: string;
  }[];
  type?: 'usual' | 'bordered';
  className?: string;
};

export default Navigation;
