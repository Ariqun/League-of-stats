import React, { useEffect } from 'react';
import { Switch, Route, useParams } from 'react-router';
import { observer } from 'mobx-react';

import Main from '../../layouts/Main';
import Container from '../../layouts/Container';
import ChampNotFound from '../../errors/ChampNotFound';
import Loading from '../../Loading';
import Navigation from '../../navs/Navigation';
import General from './General';
import Skills from './Skills';
import championStore from '../../../stores/championStore';

const Champion: React.FC = observer(() => {
  const { name }: ParamsTypes = useParams();
  const { isLoading, isError } = championStore;

  useEffect(() => {
    championStore.getChampionInfo(name);
  }, [name]);

  if (isError) return <ChampNotFound name={name} />;
  if (isLoading) return <Loading />;

  const nav = [
    { path: `/champion/${name}/general`, text: 'general' },
    { path: `/champion/${name}/skills`, text: 'skills' },
    { path: `/champion/${name}/skins`, text: 'skins' },
    { path: `/champion/${name}/builds`, text: 'builds' },
    { path: `/champion/${name}/statistics`, text: 'statistics' },
  ];

  return (
    <Main>
      <Container>
        <Navigation tabs={nav} />

        <Switch>
          <Route path={`/champion/${name}/general`} component={General} />
          <Route path={`/champion/${name}/skills`} component={Skills} />
        </Switch>
      </Container>
    </Main>
  );
});

type ParamsTypes = {
  name: string;
};

export default Champion;
