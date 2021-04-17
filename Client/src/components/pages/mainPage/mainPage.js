import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './mainPage.sass';

export default class MainPage extends Component {
	state = {
		error: false,
		champions: {},
		championNames: []
	}

	async componentDidMount() {
		const version = this.props.version || '11.8.1'
		let language = 'ru_RU'
		let championList = []

		await fetch(`http://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion.json`)
			.then(res => res.json())
			.then(result => championList = {...result.data})
			.catch(err => console.log(err))

		this.setState({champions: {...championList}, championNames: [...Object.keys(championList)]})
	}

	componentDidCatch() {
		this.setState({
			error: true
		})
	}

	render() {
		const version = this.props.version
		const items = this.state.championNames.map(item => {
			const {key, name} = this.state.champions[item]

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