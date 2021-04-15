import React, {Component} from 'react';
import ChampGeneral from '../../champComponents/champGeneral/champGeneral';
import ChampNav from '../../champComponents/champNav/champNav';

import './championPage.sass';

export default class ChampionPage extends Component {
	state = {
		general: true,
		skills: false,
		skins: false,
		builds: false,
		stats: false,
		champ: {}
	}

	async componentDidMount() {
		const champUrl = `http://ddragon.leagueoflegends.com/cdn/11.8.1/data/ru_RU/champion/${this.props.champName}.json`;

		await fetch(champUrl)
			.then(res => res.json())
			.then(result => {
				this.setState({champ: {...result.data[this.props.champName]}})
			})
			.catch(err => console.error(err))
	}

	
	render() {
		console.log(this.state.champ)
		const {id, lore, stats} = this.state.champ;
		return (
			<div className="champion_page">
				<div className="container">
					<div className="champion_info">
						<div className="picture_block">
							<img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${id}_0.jpg`} alt={`Art of ${id}`}></img>
						</div>

						<div className="info_block">
							<ChampNav/>

							<ChampGeneral info={{lore, stats}}/>
						</div>

						
						{/* <div className="lore">
							<span>{lore}</span>
						</div> */}
					</div>
				</div>
			</div>
		)
	}
}