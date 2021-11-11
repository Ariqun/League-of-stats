import React from 'react';

import { ChampionKDAType } from '../../../stores/championStore';
import calcRatio from '../../../utils/actionsWithNums/calcRatio';
import cl from './PlayerKDA.module.sass';

const PlayerKDA: React.FC<PlayerKDAProps> = ({
  kda, live = false,
}) => {
  const { kills, deaths, assists } = kda;
  let ratio = calcRatio(kills + assists, deaths, 2);

  if (deaths === 0 && live) ratio = ' - ';
  if (kills === 0 && deaths === 0 && assists === 0) ratio = ' - ';

  return (
    <div className={cl.kda_score}>
      <div className={cl.wrapper}>
        <span className={cl.kills}>{kills}</span>
        <span> / </span>
        <span className={cl.deaths}>{deaths}</span>
        <span> / </span>
        <span className={cl.assists}>{assists}</span>
      </div>

      <span className={cl.kda_ratio}> ({ratio})</span>
    </div>
  );
};

type PlayerKDAProps = {
  kda: ChampionKDAType;
  live?: boolean;
};

export default PlayerKDA;
