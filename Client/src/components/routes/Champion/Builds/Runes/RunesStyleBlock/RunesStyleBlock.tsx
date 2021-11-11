import React from 'react';

import RunesRow from '../RunesRow';
import { RuneStyleType } from '../../../../../../stores/runesStore';
import cl from './RunesStyleBlock.module.sass';

const RunesStyleBlock: React.FC<RunesStyleBlockProps> = ({
  rune, styles, perks,
}) => {
  const arrOfStyles = styles.split('_');
  const [prim, sub] = arrOfStyles;

  if (+prim !== rune.id && +sub !== rune.id) return null;

  const classes = [cl.style_block];
  rune.id === +prim ? classes.push(cl.prim) : classes.push(cl.sub);

  return (
    <div className={classes.join(' ')}>
      <img src={`https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`} alt={rune.key} />
      <div className={cl.style_title}>
        {rune.name}
      </div>

      {rune.slots.map((slot, i) => (
        <RunesRow
          slot={slot}
          perks={perks}
          sub={rune.id === +sub}
          key={i}
        />
      ))}
    </div>
  );
};

type RunesStyleBlockProps = {
  rune: RuneStyleType;
  styles: string;
  perks: {
    [key: string]: number;
    total: number;
  };
};

export default RunesStyleBlock;
