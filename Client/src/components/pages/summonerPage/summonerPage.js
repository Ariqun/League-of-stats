import React, {Component} from 'react';

import SummonerPromo from '../../sumComponents/sumPromo';
import SummonerNav from '../../sumComponents/sumNav';

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