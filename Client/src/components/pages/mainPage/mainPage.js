import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './mainPage.sass';

export default class MainPage extends Component {
	state = {
		error: false,
		version: null,
		champions: {},
		championNames: []
	}

	async componentDidMount() {
		let latestVersion = '';
		let language = 'ru_RU';
		let championList = [];

		await fetch('https://ddragon.leagueoflegends.com/api/versions.json')
			.then(res => res.json())
			.then(result => latestVersion = result[0])
			.catch(err => console.error(err))
		
		await fetch(`http://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/${language}/champion.json`)
			.then(res => res.json())
			.then(result => championList = {...result.data})
			.catch(err => console.log(err))

		this.setState({version: latestVersion, champions: {...championList}, championNames: [...Object.keys(championList)]})
	}

	componentDidCatch() {
		this.setState({
			error: true
		})
	}

	render() {
		const version = this.state.version;
		const items = this.state.championNames.map(item => {
			const {key, name} = this.state.champions[item];

			return (
				<div className="champion" key={key}>
					<Link to={`/champion/${item}`}><img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${item}.png`} alt={name} title={name}></img></Link>
				</div>
			)
		})

		return(
			<div className="main_page">
				<div className="container">
					<div className="start">
						
					</div>
					<div className="champions">
						{items}
					</div>
				</div>
			</div>
		)
	}
}