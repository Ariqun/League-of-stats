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

const App = ({version, versionLoaded, championsLoaded, runesLoaded, spellsLoaded, itemsLoaded, matchTypesLoaded}) => {
	const [isLoading, changeLoading] = useState(true);
	const dragonData = new DragonData(version);
	const db = new DataBase();

	useEffect(() => {
		const getInfo = async () => {
			const ver = await dragonData.getLatestVersion();
			const champs = await dragonData.getAllChampions();
			const runes = await dragonData.getAllRunes();
			const spells = await dragonData.getSummonerSpells();
			const items = await dragonData.getAllItems();
			const types = await dragonData.getMatchTypes();

			versionLoaded(ver);
			championsLoaded(champs);
			runesLoaded(runes);
			spellsLoaded(spells);
			itemsLoaded(items);
			matchTypesLoaded(types);
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
		runes: state.runes,
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
		},
		runesLoaded: (runes) => {
			dispatch({
				type: 'RUNES_LOADED',
				loaded: runes
			})
		},
		spellsLoaded: (spells) => {
			dispatch({
				type: 'SPELLS_LOADED',
				loaded: spells
			})
		},
		itemsLoaded: (items) => {
			dispatch({
				type: 'ITEMS_LOADED',
				loaded: items
			})
		},
		matchTypesLoaded: (matchTypes) => {
			dispatch({
				type: 'MATCH_TYPES_LOADED',
				loaded: matchTypes
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);