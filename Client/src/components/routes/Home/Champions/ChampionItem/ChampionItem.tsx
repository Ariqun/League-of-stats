import React from 'react';
import { Link } from 'react-router-dom';

import { AllChampionsTypes } from '../../../../../stores/championsStore';
import cl from './ChampionItem.module.sass';

const ChampionItem: React.FC<ChampionItemProps> = ({
  champion, inputValue, shownRoles, version,
}) => {
  const { id, name, tags } = champion;
  const lowerName = name.toLowerCase();
  const lowerValue = inputValue.toLowerCase();
  let show = false;

  for (const elem of tags) {
    if (shownRoles.includes(elem) && lowerName.includes(lowerValue)) show = true;
  }

  if (!show) return null;

  return (
    <div className={cl.champion}>
      <Link to={`/champion/${id}/general`}>
        <img
          src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${id}.png`}
          alt={name}
          title={name}
        />
      </Link>
    </div>
  );
};

type ChampionItemProps = {
  champion: AllChampionsTypes;
  inputValue: string;
  shownRoles: string[];
  version: string;
};

export default ChampionItem;
