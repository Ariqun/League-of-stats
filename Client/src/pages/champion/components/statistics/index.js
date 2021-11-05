import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import MainStats from './mainStats';
import Positions from './positions';
import Average from './average';
import Loading from '../../../../components/Loading';
import DataBase from '../../../../services/dataBase';

import './index.sass';

const Statistics = ({ champ }) => {
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
  if (!champStats.matches) return <div className="stats">{t('noData')}</div>;

  return (
    <div className="stats">
      <MainStats champStats={champStats} />

      <div className="posAndAvg">
        <Positions champStats={champStats} />
        <Average champStats={champStats} />
      </div>
    </div>
  );
};

export default Statistics;
