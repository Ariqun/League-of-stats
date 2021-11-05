import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { useTranslation } from 'react-i18next';

import ItemsBlock from './ItemsBlock';
import RunesBlock from './runesBlock';
import Loading from '../../../../components/Loading';
import DataBase from '../../../../services/dataBase';

import './index.sass';

const Builds = ({ champ }) => {
  const [isLoading, changeLoading] = useState(true);
  const [champStats, setChampStats] = useState({});
  const [t] = useTranslation();

  useEffect(() => {
    const getInfo = async () => {
      const db = new DataBase();
      const res = await db.getChampionStats(champ.key);

      setChampStats(res);
      changeLoading(false);
    };
    getInfo();
  }, [champ]);

  if (isLoading) return <Loading />;
  if (!champStats.runes[0] || !champStats.items[0]) return <div className="builds">{t('noData')}</div>;

  return (
    <div className="builds">
      <ItemsBlock champStats={champStats} />
      <RunesBlock champStats={champStats} />

      <ReactTooltip id="tooltip" html />
    </div>
  );
};

export default Builds;
