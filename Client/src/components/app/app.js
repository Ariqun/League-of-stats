import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import AppHeader from '../appHeader/appHeader';
import MainPage from '../pages/mainPage/mainPage';
import ChampionPage from '../pages/championPage/championPage';
import SummonerPage from '../pages/summonerPage/summonerPage';
import AppBackground from '../appBackground/appBackground';

import './app.sass'

export default class App extends Component {
	state = {
		version: ''
	}

	async componentDidMount() {
		let latestVersion = '';

		await fetch('https://ddragon.leagueoflegends.com/api/versions.json')
			.then(res => res.json())
			.then(result => latestVersion = result[0])
			.catch(err => console.error(err))

		this.setState({version: latestVersion})
	}


	render() {
		const version = this.state.version

		return (
			<Router>
				<div className="app">
					<AppHeader call={this.call}/>

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