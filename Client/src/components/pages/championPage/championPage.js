import React, {Component} from 'react';

import ChampGeneral from '../../champComponents/champGeneral';
import ChampNav from '../../champComponents/champNav';
import ChampSkills from '../../champComponents/champSkills';

import './championPage.sass';

export default class ChampionPage extends Component {
	state = {
		isLoading: true,
		champ: {},
		tab: 'general'
	}

	async componentDidMount() {
		const champUrl = `http://ddragon.leagueoflegends.com/cdn/11.8.1/data/ru_RU/champion/${this.props.champName}.json`;

		await fetch(champUrl)
			.then(res => res.json())
			.then(result => {
				this.setState({
					champ: {...result.data[this.props.champName]},
					isLoading: false
				})
			})
			.catch(err => console.error(err))
	}

	changeTab = (id) => {
		this.setState({tab: id})
	}

	content = () => {
		const {champ, tab} = this.state
		const {id} = champ;
		let tabContent = '';

		if (tab === 'general') {
			tabContent = <ChampGeneral champ={champ}/>
		} else if (tab === 'skills') {
			tabContent = <ChampSkills champ={champ}/>
		}

		return(
			<div className="champion_info">
				<div className="picture_block">
					<img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${id}_0.jpg`} alt={`Art of ${id}`}></img>
				</div>
	
				<div className="info_block">
					<ChampNav changeTab={this.changeTab}/>
					{tabContent}
				</div>
			</div>
		)
	}

	loading = () => {
		return(
			<div className="loading"></div>
		)
	}
	
	render() {
		const {isLoading} = this.state
		const content = isLoading ? <this.loading/> : <this.content/>

		return (
			<div className="champion_page">
				<div className="container">
					{content}
				</div>
			</div>
		)
	}
}