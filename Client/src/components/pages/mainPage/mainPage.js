import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import DragonData from '../../services/dragonData';

import './mainPage.sass';

export default class MainPage extends Component {
	dragonData = new DragonData();

	state = {
		champions: {},
		championNames: []
	}

	async componentDidMount() {
		const version = this.props.version;
		let language = 'ru_RU';

		this.dragonData.getAllChampions(`http://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion.json`)
			.then(res => this.setState({
				champions: {...res}, 
				championNames: [...Object.keys({...res})]
			}));
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