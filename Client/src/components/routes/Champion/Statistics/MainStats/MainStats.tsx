import React from 'react';

import CircleGraphCard from '../../../../cards/CircleGraphCard';
import cl from './MainStats.module.sass';

const MainStats: React.FC = () => {
  const types = ['winrate', 'banrate', 'pickrate'];

  return (
    <div className={cl.main_stats}>
      {types.map((type) => <CircleGraphCard type={type} key={type} />)}
    </div>
  );
};

export default MainStats;
