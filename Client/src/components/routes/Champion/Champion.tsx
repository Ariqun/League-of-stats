import React, { useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router';
import { observer } from 'mobx-react';

import Main from '../../layouts/Main';
import Container from '../../layouts/Container';
import ChampNotFound from '../../errors/ChampNotFound';
import Loading from '../../Loading';
import Navigation from '../../Navigation';
import General from './General';
import Skills from './Skills';
import Skins from './Skins';
import Builds from './Builds';
import Statistics from './Statistics';
import championStore from '../../../stores/championStore';

const Champion: React.FC = observer(() => {
  const { name }: ParamsTypes = useParams();
  const { isLoading, isError } = championStore;

  useEffect(() => {
    championStore.getChampionInfo(name);

    return () => championStore.clearStore();
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
        <Navigation links={nav} type="bordered" />

        <Routes>
          <Route path="/general" element={<General />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/skins" element={<Skins />} />
          <Route path="/builds" element={<Builds />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="*" element={<General />} />
        </Routes>
      </Container>
    </Main>
  );
});

type ParamsTypes = {
  name: string | undefined;
};

export default Champion;
