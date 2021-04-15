import React, {Component} from 'react';

import SummonerPromo from '../../summonerPromo/summonerPromo';
import SummonerNav from '../../summonerNav/summonerNav';

import './summonerPage.sass';

export default class SummonerPage extends Component {
	render() {
		const {name, region, lvl, iconID} = this.props.summoner;

		return (
			<div className="container">
				<div className="summoner">
					<SummonerPromo summoner={{name, region, lvl, iconID}}/>
					<SummonerNav/>
	
					<div className="rating">
	
					</div>
				</div>
			</div>
		)
	}
}