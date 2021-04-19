import React, {Component} from 'react';

import SummonerPromo from '../../sumComponents/sumPromo';
import SummonerNav from '../../sumComponents/sumNav';
import SummonerMatches from '../../sumComponents/sumMatches';
import Loading from '../../loading/loading';

import RiotAPI from '../../services/riotAPI';

import './summonerPage.sass';

export default class SummonerPage extends Component {
	riotAPI = new RiotAPI();

	state = {
		isLoading: true,
		summoner: {},
		tab: 'matches'
	}

	async componentDidMount() {
		const {region, name} = this.props
		
		const res = await this.riotAPI.getSummoner(region, name);

		this.setState({isLoading: false, summoner: {...res}})
	}
	
	changeTab = (id) => {
		this.setState({tab: id})
	}

	render() {
		if (this.state.isLoading) {
			return <Loading/>
		}

		const version = this.props.version
		const {summoner, tab} = this.state
		const {puuID} = summoner.tech
		let tabContent = ""

		if (tab === 'matches') {
			tabContent = <SummonerMatches puuID={puuID} name={summoner.name} version={version}/>
		}

		return (
			<div className="container">
				<div className="summoner">
					<SummonerPromo summoner={summoner} version={version}/>
					<SummonerNav changeTab={this.changeTab}/>
	
					{tabContent}
				</div>
			</div>
		)
	}
}