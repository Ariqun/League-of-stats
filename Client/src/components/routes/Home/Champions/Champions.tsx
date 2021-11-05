import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import Loading from '../../../Loading';
import { DataNotFound } from '../../../errors';
import ChampionsStore from '../../../../stores/championsStore';
import VersionStore from '../../../../stores/versionStore';
import cl from './Champions.module.sass';

const Champions: React.FC<ChampionsProps> = observer(({ inputValue, shownRoles }) => {
  const { isLoading: isVersionLoading, version } = VersionStore;
  const {
    isLoading, isError, champions, championNames,
  } = ChampionsStore;

  if (isError) return <DataNotFound />;
  if (isLoading && isVersionLoading) return <Loading />;

  return (
    <div className={cl.champions}>
      {championNames.map((champName) => {
			  const { key, name, tags } = champions[champName];
			  const lowerName = name.toLowerCase();
			  const lowerValue = inputValue.toLowerCase();
			  let show = false;

			  for (const elem of tags) {
			    if (shownRoles.includes(elem) && lowerName.includes(lowerValue)) show = true;
			  }

			  if (!show) return null;

			  return (
  <div className={cl.champion} key={key}>
    <Link to={`/champion/${champName}/general`}>
      <img
        src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champName}.png`}
        alt={name}
        title={name}
      />
    </Link>
  </div>
			  );
      })}
    </div>
  );
});

type ChampionsProps = {
  inputValue: string;
  shownRoles: string[];
};

export default Champions;
