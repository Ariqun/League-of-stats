import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import cl from './BorderedLink.module.sass';

const BorderedLink: React.FC<BorderedLinkProps> = ({
  link,
}) => {
  const [t] = useTranslation();

  return (
    <NavLink className={setActive} to={link.path}>
      {t(link.text)}
    </NavLink>
  );
};

const setActive = ({ isActive }: SetActiveType) => (isActive ? cl.active : cl.link);

type SetActiveType = {
  isActive: boolean;
};

type BorderedLinkProps = {
  link: {
    path: string;
    text: string;
  };
};

export default BorderedLink;
