import React from 'react';

import Container from '../../layouts/Container';
import Main from '../../layouts/Main';
import Loading from '../../Loading';
import RunesBlock from './RunesBlock';
import runesStore from '../../../stores/runesStore';
import cl from './Runes.module.sass';

const Runes: React.FC = () => {
  const { allRunes, isLoading, isError } = runesStore;

  if (isLoading) return <Loading />;

  return (
    <Main>
      <Container>
        <div className={cl.runes_page}>
          {allRunes.map((runeStyle) => (
            <RunesBlock runeStyle={runeStyle} key={runeStyle.id} />
          ))}
        </div>
      </Container>
    </Main>
  );
};

export default Runes;
