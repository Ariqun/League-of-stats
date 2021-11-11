import React from 'react';

import AverageData from './AverageData';
import MainStats from './MainStats';
import Positions from './Positions';
import cl from './Statistics.module.sass';

const Statistics: React.FC = () => (
  <div className={cl.statistics}>
    <MainStats />

    <div className={cl.posAndAvg}>
      <Positions />
      <AverageData />
    </div>
  </div>
);

export default Statistics;
