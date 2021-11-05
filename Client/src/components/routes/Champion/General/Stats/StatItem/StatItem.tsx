import React from 'react';
import { useTranslation } from 'react-i18next';

import cl from './StatItem.module.sass';

const StatItem: React.FC<StatItemProps> = ({ str, right }) => {
  const [t] = useTranslation();
  const [name, value] = str.split(':');

  const side = right ? cl.right : cl.left;
  const sideOfName = right ? ` - ${t(name)}` : `${t(name)} - `;

  return (
    <div className={`${cl.stat} ${side}`}>
      <span className={cl.name}>
        {sideOfName}
      </span>

      <span className={cl.value}>
        {value}
      </span>
    </div>
  );
};

type StatItemProps = {
  str: string;
  right?: boolean;
};

export default StatItem;
