import React from 'react';
import { useTranslation } from 'react-i18next';

import PlayerKDA from '../../playerInfo/PlayerKDA';
import AverageBlock from './AverageBlock';
import { ChampionComboType, ChampionDmgType, ChampionKDAType } from '../../../stores/championStore';
import calcRatio from '../../../utils/actionsWithNums/calcRatio';
import cl from './AverageDataCard.module.sass';

const AverageDataCard: React.FC<AverageDataCardProps> = ({
  stats,
}) => {
  const [t] = useTranslation();
  const {
    matches, creeps, gold, kda, dmg, combo,
  } = stats;

  const kdaData = {
    kills: +calcRatio(kda.kills, matches, 1),
    deaths: +calcRatio(kda.deaths, matches, 1),
    assists: +calcRatio(kda.assists, matches, 1),
  };

  const statsData = [
    { type: 'creeps', value: calcRatio(creeps, matches, 1) },
    { type: 'dmg', value: calcRatio((dmg.physical + dmg.magic + dmg.trueDmg), matches, 1) },
    { type: 'gold', value: calcRatio(gold, matches, 1) },
    { type: 'double', value: calcRatio(combo.double, matches, 4), combo: true },
    { type: 'triple', value: calcRatio(combo.triple, matches, 4), combo: true },
    { type: 'quadra', value: calcRatio(combo.quadra, matches, 4), combo: true },
    { type: 'penta', value: calcRatio(combo.penta, matches, 4), combo: true },
  ];

  return (
    <div className={cl.average}>
      <div className={cl.title}>
        {t('average')}
      </div>

      <div className={`${cl.kda} col-12`}>
        <span className={cl.kda_title}>KDA</span>
        <PlayerKDA kda={kdaData} />
      </div>

      <div className={cl.wrapper}>
        {statsData.map((stat) => <AverageBlock {...stat} key={stat.type} />)}
      </div>
    </div>
  );
};

type AverageDataCardProps = {
  stats: {
    matches: number;
    creeps: number;
    gold: number;
    kda: ChampionKDAType;
    dmg: ChampionDmgType;
    combo: ChampionComboType;
  };
};

export default AverageDataCard;
