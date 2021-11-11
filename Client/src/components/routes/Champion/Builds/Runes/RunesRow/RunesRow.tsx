import React from 'react';

import SingleRune from '../SingleRune';
import { SlotsType } from '../../../../../../stores/runesStore';
import cl from './RunesRow.module.sass';

const RunesRow: React.FC<RunesRowProps> = ({
  slot, perks, sub,
}) => {
  const classes = [cl.runes_row];
  if (sub) classes.push(cl.sub);

  return (
    <div className={classes.join(' ')}>
      {slot.runes.map((rune) => (
        <SingleRune rune={rune} slot={slot} perks={perks} key={rune.id}	/>
      ))}
    </div>
  );
};

type RunesRowProps = {
  slot: SlotsType;
  perks: {
    [key: string]: number;
    total: number;
  };
  sub: boolean;
};

export default RunesRow;
