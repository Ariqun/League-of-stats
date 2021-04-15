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
		name: '',
		region: 'ru',
		summoner: {}
	}

	setName = (e) => {
		this.setState({name: e.target.value});
	}

	setRegion = (e) => {
		this.setState({region: e.target.value});
	}

	setSummoner = (obj) => {
		this.setState({summoner: {...obj}})
	}

	call = (e) => {
		e.preventDefault();

		fetch('/summoner', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: `summoner=${this.state.name}&region=${this.state.region}`
		})
		.then(res => res.json())
		.then(result => this.setSummoner(result))
		.catch((err) => console.log(err))
	}

	render() {
		return (
			<Router>
				<div className="app">
					<AppHeader 
						name={this.state.name} 
						setName={this.setName}
						region={this.state.region}
						setRegion={this.setRegion}
						call={this.call}
					/>
					<Route path="/" exact component={MainPage}/>
					<Route path="/champion/:name" render={
						({match}) => {
							const {name} = match.params;
							return <ChampionPage champName={name}/>
						}
					}/>
					<Route path="/summoner" exact component={SummonerPage}/>
					<Route path="/summoner/:region/:name" component={SummonerPage}/>
		
					<AppBackground/>
				</div>
			</Router>
		)
	}
}