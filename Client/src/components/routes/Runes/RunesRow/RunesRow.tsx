import React from 'react';

import SingleRune from '../SingleRune';
import { SlotsType } from '../../../../stores/runesStore';
import cl from './RunesRow.module.sass';

const RunesRow: React.FC<RunesRowProps> = ({ slot }) => (
  <div className={cl.row}>
    {slot.runes.map((rune) => (
      <SingleRune rune={rune} key={rune.id} />
    ))}
  </div>
);

type RunesRowProps = {
  slot: SlotsType;
};

export default RunesRow;
