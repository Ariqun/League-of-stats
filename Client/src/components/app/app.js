import React, {useState, useEffect} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import Header from './header';
import Background from './background';
import Footer from './footer';

import Main from '../../pages/main';
import Champion from '../../pages/champion';
import Items from '../../pages/items';
import Runes from '../../pages/runes/';
import Summoner from '../../pages/summoner';
import Match from '../../pages/match';
import LiveMatch from '../../pages/liveMatch';
import Loading from '../loading';

import DragonData from '../../services/dragonData';
import DataBase from '../../services/dataBase';

import './app.sass'

const App = ({language = 'ru_RU', version, versionLoaded, championsLoaded}) => {
	const [isLoading, changeLoading] = useState(true);
	const dragonData = new DragonData();
	const db = new DataBase();

	useEffect(() => {
		const getInfo = async () => {
			const ver = await dragonData.getLatestVersion();
			const champs = await dragonData.getAllChampions(`http://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion.json`);

			versionLoaded(ver);
			championsLoaded(champs)
			changeLoading(false);
		}
		getInfo();
		db.start();
	}, [])

	const render = () => {
		if (isLoading) return <Loading />

		return (
			<div className="app">
				<Header />

				<Route path="/" exact render={() => {
					return <Main />
				}}/>

				<Route path="/champion/:name" render={({match}) => {
					const {name} = match.params;
					return <Champion champName={name}/>
				}}/>

				<Route path="/items" render={() => {
					return <Items />
				}}/>

				<Route path="/runes" render={() => {
					return <Runes />
				}}/>
				
				<Route path="/summoner/:region/:name" render={({match}) => {
					const {region, name} = match.params;
					return <Summoner region={region} name={name} />
				}}/>

				<Route path="/match/:region/:id" render={({match}) => {
					const {region, id} = match.params;
					return <Match region={region} matchId={id} />
				}}/>

				<Route path="/live/:region/:name/" render={() => {
					return <LiveMatch />
				}}/>
	
				<Footer/>
				<Background/>
			</div>
		)
	}

	return render();
};

const mapStateToProps = (state) => {
	return {
		version: state.version,
		champions: state.champions
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		versionLoaded: (version) => {
			dispatch({
				type: 'VERSION_LOADED',
				loaded: version
			})
		},
		championsLoaded: (champions) => {
			dispatch({
				type: 'CHAMPIONS_LOADED',
				loaded: champions
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);