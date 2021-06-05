import React, {useState, useEffect} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';

import Header from './header';
import Footer from './footer';
import Up from '../buttons/up';

import Main from '../../pages/main';
import Champion from '../../pages/champion';
import Items from '../../pages/items';
import Runes from '../../pages/runes/';
import Summoner from '../../pages/summoner';
import Match from '../../pages/match';
import LiveMatch from '../../pages/liveMatch';
import checkLanguage from '../languages/checkLanguage';
import langForDB from '../languages/langForDB';
import {LoadingPage} from '../loading';

import DragonData from '../../services/dragonData';

import './app.sass';

const App = ({version, versionLoaded, championsLoaded, runesLoaded, spellsLoaded, itemsLoaded, matchTypesLoaded}) => {
	const [isLoading, changeLoading] = useState(true);
	const [language, setLanguage] = useState(checkLanguage())
	const [t, i18n] = useTranslation();

	const dragonData = new DragonData(version, langForDB(language));
	
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
	}, [language])

	const changeLang = (e) => {
		localStorage.setItem('lang', e.target.value);
		setLanguage(e.target.value)
		i18n.changeLanguage(e.target.value);
	}

	if (isLoading) return <LoadingPage />
	
	return (
		<div className="app">
			<Header changeLang={changeLang}/>

			<Route path="/" exact render={() => <Main />} />
			<Route path="/items" render={() => <Items />} />
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
			}}/>

			<Up />
			<Footer />
		</div>
	)
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