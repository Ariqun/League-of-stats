import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import AppHeader from '../appHeader/appHeader';
import AppBackground from '../appBackground/appBackground';

import MainPage from '../pages/mainPage/mainPage';
import ChampionPage from '../pages/championPage/championPage';
import ItemsPage from '../pages/itemsPage/itemsPage';
import SummonerPage from '../pages/summonerPage/summonerPage';
import MatchPage from '../pages/matchPage/matchPage';

import DragonData from '../services/dragonData';
import DataBase from '../services/dataBase';

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
					<AppHeader/>

					<Route path="/" exact render={() => {
						return <MainPage version={version}/>
					}}/>

					<Route path="/champion/:name" render={({match}) => {
						const {name} = match.params;
						return <ChampionPage champName={name} version={version}/>
					}}/>

					<Route path="/items" render={() => {
						return <ItemsPage version={version}/>
					}}/>
					
					<Route path="/summoner/:region/:name" render={({match}) => {
						const {region, name} = match.params;
						return <SummonerPage region={region} name={name} version={version}/>
					}}/>

					<Route path="/match/:region/:id" render={({match}) => {
						const {region, id} = match.params;
						return <MatchPage region={region} matchId={id} version={version}/>
					}}/>
		
					<AppBackground/>
				</div>
			</Router>
		)
	}

	return render();
}

export default App;