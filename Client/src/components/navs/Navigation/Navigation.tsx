import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import cl from './Navigation.module.sass';

const Navigation: React.FC<NavigationProps> = ({ tabs }) => {
  const [t] = useTranslation();

  return (
    <ul className={cl.nav}>
      {tabs.map((tab) => (
        <Link to={tab.path} key={tab.path}>
          {t(tab.text)}
        </Link>
      ))}
    </ul>
  );
};

type NavigationProps = {
  tabs: {
    path: string;
    text: string;
  }[];
};

export default Navigation;
