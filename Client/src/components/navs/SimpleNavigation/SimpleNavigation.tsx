import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import cl from './SimpleNavigation.module.sass';

const SimpleNavigation: React.FC<SimpleNavigationProps> = ({ tabs }) => {
  const [t] = useTranslation();

  return (
    <ul className={cl.nav}>
      {tabs.map((tab) => (
        <li key={tab.path}>
          <Link className={cl.link} to={tab.path}>
            {t(tab.text)}
          </Link>
        </li>
      ))}
    </ul>
  );
};

type SimpleNavigationProps = {
  tabs: {
    path: string;
    text: string;
  }[];
};

export default SimpleNavigation;
