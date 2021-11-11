import React from 'react';

import AverageDataCard from '../../../../cards/AverageDataCard';
import championStore from '../../../../../stores/championStore';

const AverageData: React.FC = () => {
  const {
    matches, creeps, gold, kda, dmg, combo,
  } = championStore.championStats;
  const stats = {
    matches, creeps, gold, kda, dmg, combo,
  };

  return <AverageDataCard stats={stats} />;
};

export default AverageData;
