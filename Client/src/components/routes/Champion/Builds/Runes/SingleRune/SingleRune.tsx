import React from 'react';

import modifyRunes from '../../../../../../utils/actions/modifyRunes';
import { RuneType, SlotsType } from '../../../../../../stores/runesStore';
import cl from './SingleRune.module.sass';

const SingleRune: React.FC<SingleRuneProps> = ({
  rune, slot, perks,
}) => {
  const runesArray = modifyRunes(slot, perks);
  const runeClasses = [cl.rune];
  if (rune.id === runesArray[0]?.id) runeClasses.push(cl.active);

  return (
    <div className={runeClasses.join(' ')}>
      <img src={`https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`} alt={`icon_${rune.id}`} />
    </div>
  );
};

type SingleRuneProps = {
  rune: RuneType;
  slot: SlotsType;
  perks: {
    [key: string]: number;
    total: number;
  };
};

export default SingleRune;
