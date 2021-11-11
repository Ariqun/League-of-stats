import React from 'react';
import { useTranslation } from 'react-i18next';

import RunesColumn from './RunesColumn';
import championStore from '../../../../../stores/championStore';
import sortRunes from '../../../../../utils/actions/sortRunes';
import cl from './Runes.module.sass';

const Runes: React.FC = () => {
  const [t] = useTranslation();

  const { runes: championRunes } = championStore.championStats;
  const sortedRunes = sortRunes(championRunes);

  return (
    <div className={cl.block}>
      <div className={cl.title}>{t('runesPopularity')}</div>

      <div className={cl.wrapper}>
        {sortedRunes.map((runeStyles, i) => (
          <RunesColumn runeStyles={runeStyles} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Runes;
