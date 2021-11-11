import React from 'react';

import Container from '../layouts/Container';
import Navigation from '../Navigation';
import FindSummonerForm from '../ui/Forms/FindSummonerForm';
import ChangeLangForm from '../ui/Forms/ChangeLangForm';
import cl from './Header.module.sass';

const Header: React.FC = () => {
  const nav = [
    { path: '/', text: 'champs' },
    { path: '/items', text: 'items' },
    { path: '/runes', text: 'runes' },
  ];

  return (
    <Container className={cl.header}>
      <Navigation links={nav} className={cl.nav} />

      <div className={cl.forms}>
        <FindSummonerForm />
        <ChangeLangForm />
      </div>
    </Container>
  );
};

export default Header;
