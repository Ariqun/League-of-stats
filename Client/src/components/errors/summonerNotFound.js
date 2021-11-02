import React from 'react';
import { useTranslation } from 'react-i18next';

import './errors.sass';

const SummonerNotFound = ({ name }) => {
  const [t] = useTranslation();

  return (
    <div className="data_not_found">
      <div>{t('playerWithName')} <span>{name}</span> {t('notFound')}.</div>
      <div>{t('wrongRegionOrName')}.</div>
    </div>
  );
};

export default SummonerNotFound;
