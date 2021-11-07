import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import cl from './Navigation.module.sass';

const Navigation: React.FC<NavigationProps> = ({
  tabs, className = '',
}) => {
  const [t] = useTranslation();

  return (
    <ul className={`${cl.nav} ${className}`}>
      {tabs.map((tab) => (
        <li key={tab.path}>
          <NavLink
            className={({ isActive }) => cl.sky_btn + (isActive ? ` ${cl.active}` : '')}
            to={tab.path}
          >
            {t(tab.text)}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

type NavigationProps = {
  tabs: {
    path: string;
    text: string;
  }[];
  className?: string;
};

export default Navigation;
