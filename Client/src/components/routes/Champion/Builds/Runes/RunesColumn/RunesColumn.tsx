import React from 'react';

import PopulationBar from '../../../../../ui/bars/PopulationBar';
import RunesStyleBlock from '../RunesStyleBlock';
import championStore, { ChampionRunesType } from '../../../../../../stores/championStore';
import runesStore from '../../../../../../stores/runesStore';
import cl from './RunesColumn.module.sass';

const RunesColumn: React.FC<RunesColumnProps> = ({ runeStyles }) => {
  const { matches, runes: championRunes } = championStore.championStats;
  const { allRunes } = runesStore;

  const styles = Object.keys(runeStyles)[0];
  const perks = championRunes[styles];

  return (
    <div className={cl.column}>
      <PopulationBar current={perks.total} max={matches} pop />

      {allRunes.map((rune) => (
        <RunesStyleBlock
          rune={rune}
          styles={styles}
          perks={perks}
          key={rune.id}
        />
      ))}
    </div>
  );
};

type RunesColumnProps = {
  runeStyles: ChampionRunesType;
};

export default RunesColumn;
