import React, {useState, useEffect} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';

import Main from './pages/main';
import Champion from './pages/champion';
import Items from './pages/items';
import Runes from './pages/runes';
import Summoner from './pages/summoner';
import Match from './pages/match';
import LiveMatch from './pages/liveMatch';
import Header from './components/header';
import Up from './components/buttons/up';
import checkLanguage from './components/languages/checkLanguage';
import langForDB from './components/languages/langForDB';
import {LoadingPage} from './components/loading';

import DragonData from './services/dragonData';

const App = ({version, versionLoaded, championsLoaded, runesLoaded, spellsLoaded, itemsLoaded, matchTypesLoaded}) => {
	const [isLoading, changeLoading] = useState(true);
	const [language, setLanguage] = useState(checkLanguage())
	const [t, i18n] = useTranslation();
	
	useEffect(() => {
		const getInfo = async () => {
			const dd = new DragonData(version, langForDB(language));
			const ver = await dd.getLatestVersion();
			const champs = await dd.getAllChampions();
			const runes = await dd.getAllRunes();
			const spells = await dd.getSummonerSpells();
			const items = await dd.getAllItems();
			const types = await dd.getMatchTypes();

			versionLoaded(ver);
			championsLoaded(champs);
			runesLoaded(runes);
			spellsLoaded(spells);
			itemsLoaded(items);
			matchTypesLoaded(types);
			changeLoading(false);
		}
		getInfo();
	}, [version, versionLoaded, championsLoaded, runesLoaded, spellsLoaded, itemsLoaded, matchTypesLoaded, language])

	const changeLang = (e) => {
		const value = e.target.value;

		localStorage.setItem('lang', value);
		setLanguage(value)
		i18n.changeLanguage(value);
	}

	if (isLoading) return <LoadingPage />;
	
	return (
		<div className="app">
			<Header changeLang={changeLang} />

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