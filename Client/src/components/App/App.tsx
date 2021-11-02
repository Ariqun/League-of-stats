import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import 'antd/dist/antd.css';

import Home from '../routes/Home';
import Header from '../Header/Header';
import checkLanguage from '../../utils/languages/checkLanguage';
import Up from '../ui/buttons/up';
import cl from './App.module.sass';

const App = observer(() => (
  <div className={cl.app}>
    <Header />

    <Switch>
      <Route exact path="/" component={Home} />
      {/* <Route path="/" exact render={ () => <Main /> } /> */}
      {/* <Route path="/items" render={() => <Items />} />
				<Route path="/runes" render={() => <Runes />} />

				<Route path="/champion/:name" render={({match}) => {
					const {name} = match.params;
					return <Champion champName={name} lang={language}/>
				}}/>

				<Route path="/summoner/:region/:name" render={({match}) => {
					const {region, name} = match.params;
					return <Summoner region={region} name={name} />
				}}/>

				<Route path="/match/:region/:id" render={({match}) => {
					const {region, id} = match.params;
					return <Match region={region} matchId={id} />
				}}/>

				<Route path="/live/:region/:name/" render={({match}) => {
					const {region, name} = match.params;
					return <LiveMatch region={region} name ={name} />
				}}/> */}
    </Switch>

    {/* <Up /> */}
  </div>
));

export default App;