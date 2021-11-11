import React from 'react';

import { RuneType } from '../../../../stores/runesStore';
import cl from './SingleRune.module.sass';

const SingleRune: React.FC<SingleRuneProps> = ({ rune }) => (
  <div className={cl.rune}>
    <img src={`https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`} alt={rune.name} />
  </div>
);

type SingleRuneProps = {
  rune: RuneType;
};

export default SingleRune;
