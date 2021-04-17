import React, {Component} from 'react';

import SummonerPromo from '../../sumComponents/sumPromo';
import SummonerNav from '../../sumComponents/sumNav';

import './summonerPage.sass';
import SummmonerGeneral from '../../sumComponents/sumGeneral';

export default class SummonerPage extends Component {
	state = {
		summoner: {},
		tab: 'general'
	}

	async componentDidMount() {
		const {region, name} = this.props

		await fetch('/summoner', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: `summoner=${name}&region=${region}`
		})
		.then(res => res.json())
		.then(result => this.setState({summoner: {...result}}))
		.catch((err) => console.log(err))
	}

	changeTab = (id) => {
		this.setState({tab: id})
	}

	render() {
		const version = this.props.version
		const {summoner, tab} = this.state
		let content = ""
		console.log(summoner)

		if (tab === 'general') {
			content = <SummmonerGeneral summoner={summoner}/>
		}

		return (
			<div className="container">
				<div className="summoner">
					<SummonerPromo summoner={summoner} version={version}/>
					<SummonerNav changeTab={this.changeTab}/>
	
					{content}
				</div>
			</div>
		)
	}
}