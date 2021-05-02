import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Header from './header';
import Background from './background';

import Main from '../../pages/main';
import Champion from '../../pages/champion';
import Items from '../../pages/items';
import Summoner from '../../pages/summoner';
import Match from '../../pages/match';

import DragonData from '../../services/dragonData';
import DataBase from '../../services/dataBase';

import './app.sass'

function App() {
	const [version, setVersion] = useState('11.8.1');
	const dragonData = new DragonData();
	const db = new DataBase();

	useEffect(() => {
		const checkVersion = async () => {
			const res = await dragonData.getLatestVersion();
			setVersion(res);
		}
		checkVersion();
		db.start();
	}, [])

	const render = () => {
		return (
			<Router>
				<div className="app">
					<Header/>

					<Route path="/" exact render={() => {
						return <Main version={version}/>
					}}/>

					<Route path="/champion/:name" render={({match}) => {
						const {name} = match.params;
						return <Champion champName={name} version={version}/>
					}}/>

					<Route path="/items" render={() => {
						return <Items version={version}/>
					}}/>
					
					<Route path="/summoner/:region/:name" render={({match}) => {
						const {region, name} = match.params;
						return <Summoner region={region} name={name} version={version}/>
					}}/>

					<Route path="/match/:region/:id" render={({match}) => {
						const {region, id} = match.params;
						return <Match region={region} matchId={id} version={version}/>
					}}/>
		
					<Background/>
				</div>
			</Router>
		)
	}

	return render();
}

export default App;