import React, {Component} from 'react';

import ChampNav from '../../champComponents/champNav';
import ChampGeneral from '../../champComponents/champGeneral';
import ChampSkills from '../../champComponents/champSkills';
import ChampSkins from '../../champComponents/champSkins';
import ChampStats from '../../champComponents/champStats';
import Loading from '../../loading/loading';

import DragonData from '../../services/dragonData';

import './championPage.sass';

export default class ChampionPage extends Component {
	dragonData = new DragonData();

	state = {
		isLoading: true,
		champ: {},
		tab: 'general'
	}

	async componentDidMount() {
		const {version, champName} = this.props;
		const language = 'ru_RU';

		this.dragonData.getChampion(`http://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion/${champName}.json`)
			.then(res => this.setState({
				champ: {...res[champName]},
				isLoading: false
			}))
	}

	changeTab = (id) => {
		this.setState({tab: id})
	}

	content = () => {
		const {champ, tab} = this.state;
		const version = this.props.version;
		const {id} = champ;
		let tabContent = '';

		if (tab === 'general') {
			tabContent = <ChampGeneral champ={champ} id={id}/>;
		} else if (tab === 'skills') {
			tabContent = <ChampSkills champ={champ} version={version}/>;
		} else if (tab === 'skins') {
			tabContent = <ChampSkins champ={champ}/>;
		} else if (tab === 'stats') {
			tabContent = <ChampStats champ={champ}/>
		}

		return tabContent;
	}
	
	render() {
		const {isLoading} = this.state
		const content = isLoading ? <Loading/> : <this.content/>

		return (
			<div className="champion_page">
				<div className="container">
					<ChampNav changeTab={this.changeTab}/>
					{content}
				</div>
			</div>
		)
	}
}