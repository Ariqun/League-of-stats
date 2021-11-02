import React from 'react';
import { useTranslation } from 'react-i18next';

import './errors.sass';

const ChampNotFound = ({ name }) => {
  const [t] = useTranslation();

  return (
    <div className="data_not_found">
      <div>{t('champ')} <span>{name}</span> {t('notFound')}.</div>
      <div>{t('weKnow')}</div>
    </div>
  );
};

export default ChampNotFound;
