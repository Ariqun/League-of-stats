import React, {Component} from 'react';

import Promo from '../profile-promo/profile-promo';
import ProfileNav from '../profile-nav/profile-nav';

import './profile.sass';

export default class Profile extends Component {
	render() {
		const {name, region, lvl, iconID} = this.props.summoner;

		return (
			<div className="container">
				<div className="profile">
					<Promo summoner={{name, region, lvl, iconID}}/>
					<ProfileNav/>
	
					<div className="rating">
	
					</div>
				</div>
			</div>
		)
	}
}