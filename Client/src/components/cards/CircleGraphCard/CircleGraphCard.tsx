import React from 'react';
import { useTranslation } from 'react-i18next';

import CircleGraph from '../../ui/graphs/CircleGraph';
import championStore from '../../../stores/championStore';
import cl from './CircleGraphCard.module.sass';

const CircleGraphCard: React.FC<CircleGraphCardProps> = ({
  type,
}) => {
  const [t] = useTranslation();

  const {
    wins, matches, totalMatches, bans,
  } = championStore.championStats;
  let secondary = matches - wins;

  if (type === 'banrate') secondary = totalMatches - bans;
  if (type === 'pickrate') secondary = totalMatches - matches;

  return (
    <div className={`${cl.graph} col-5 col-sm-3 col-lg-2`} key={type}>
      <div className={cl.title}>
        {t(type)}
      </div>

      <CircleGraph primary={wins} secondary={secondary} width="200" height="200" mode="hidden" />
    </div>
  );
};

type CircleGraphCardProps = {
  type: string;
};

export default CircleGraphCard;
