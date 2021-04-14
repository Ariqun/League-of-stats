import React, {Component} from 'react';

import AppHeader from '../app-header/app-header';
import Profile from '../profile/profile';
import AppBackground from '../app-background/app-background';

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
			<>
				<AppHeader 
					name={this.state.name} 
					setName={this.setName}
					region={this.state.region}
					setRegion={this.setRegion}
					call={this.call}
				/>
				<Profile summoner={this.state.summoner}/>
	
				<AppBackground/>
			</>
		)
	}
}