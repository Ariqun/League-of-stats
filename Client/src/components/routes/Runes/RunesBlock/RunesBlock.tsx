import React from 'react';

import RunesRow from '../RunesRow';
import { RuneStyleType } from '../../../../stores/runesStore';
import cl from './RunesBlock.module.sass';

const RunesBlock: React.FC<RunesBlockProps> = ({ runeStyle }) => {
  const { icon, name, slots } = runeStyle;

  return (
    <div className={cl.style}>
      <img src={`https://ddragon.leagueoflegends.com/cdn/img/${icon}`} alt={name} />
      <div className={cl.title}>
        {name}
      </div>

      {slots.map((slot, i) => <RunesRow slot={slot} key={i} />)}
    </div>
  );
};

type RunesBlockProps = {
  runeStyle: RuneStyleType;
};

export default RunesBlock;
