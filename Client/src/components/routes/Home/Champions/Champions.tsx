import React from 'react';
import { observer } from 'mobx-react';

import ChampionItem from './ChampionItem';
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
  if (isLoading || isVersionLoading) return <Loading />;

  return (
    <div className={cl.champions}>
      {championNames.map((champName) => (
        <ChampionItem
          champion={champions[champName]}
          inputValue={inputValue}
          shownRoles={shownRoles}
          version={version}
          key={champName}
        />
      ))}
    </div>
  );
});

type ChampionsProps = {
  inputValue: string;
  shownRoles: string[];
};

export default Champions;
