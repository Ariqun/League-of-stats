import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import AppHeader from '../appHeader/appHeader';
import MainPage from '../pages/mainPage/mainPage';
import ChampionPage from '../pages/championPage/championPage';
import SummonerPage from '../pages/summonerPage/summonerPage';
import AppBackground from '../appBackground/appBackground';

import DragonData from '../services/dragonData';

import './app.sass'


export default class App extends Component {
	dragonData = new DragonData();

	state = {
		version: '11.8.1'
	}

	async componentDidMount() {
		const res = await this.dragonData.getLatestVersion();
		this.setState({version: res})
	}

	render() {
		const version = this.state.version
		
		return (
			<Router>
				<div className="app">
					<AppHeader/>

					<Route path="/" exact render={
						() => {
							return <MainPage version={version}/>
						}
					}/>

					<Route path="/champion/:name" render={
						({match}) => {
							const {name} = match.params;
							return <ChampionPage champName={name} version={version}/>
						}
					}/>
					
					<Route path="/summoner/:region/:name" render={
						({match}) => {
							const {region, name} = match.params
							return <SummonerPage region={region} name={name} version={version}/>
						}
					}/>
		
					<AppBackground/>
				</div>
			</Router>
		)
	}
}