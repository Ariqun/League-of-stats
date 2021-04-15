import React, {Component} from 'react';

import './championPage.sass';

export default class ChampionPage extends Component {
	state = {
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
		const {id, lore} = this.state.champ;
		return (
			<div className="champion_page">
				<div className="container">
					<div className="champion_info">
						<div className="picture">
							<img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${id}_0.jpg`} alt={`Art of ${id}`}></img>
						</div>

						<div className='champion_nav'>
							<button>Общее</button>
							<button>Умения</button>
							<button>Билды</button>
							<button>Скины</button>
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