import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import cl from './UsualLink.module.sass';

const UsualLink: React.FC<UsualLinkProps> = ({ link }) => {
  const [t] = useTranslation();

  return (
    <Link className={cl.link} to={link.path}>
      {t(link.text)}
    </Link>
  );
};

type UsualLinkProps = {
  link: {
    path: string;
    text: string;
  };
};

export default UsualLink;
