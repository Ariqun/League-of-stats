import React from 'react';

import StatItem from './StatItem';
import { StatTypes } from '../../../../../stores/championsStore';
import sortStats from '../../../../../utils/actionsWithObj/sortStats';
import cl from './Stats.module.sass';

const Stats: React.FC<StatsProps> = ({ stats }) => {
  const sortedStats: string[] = sortStats(stats);

  return (
    <div className={cl.stats}>
      {sortedStats.map((item, i) => (
        <StatItem str={item} right={i % 2 !== 0} key={item} />
      ))}
    </div>
  );
};

type StatsProps = {
  stats: StatTypes;
};

export default Stats;
