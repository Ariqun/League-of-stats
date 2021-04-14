import React, {Component} from 'react';

import Promo from '../profile-promo/profile-promo';
import ProfileNav from '../profile-nav/profile-nav';

import './profile.sass';

export default class Profile extends Component {
	render() {
		return (
			<div className="container">
				<div className="profile">
					<Promo/>
					<ProfileNav/>
	
					<div className="rating">
	
					</div>
				</div>
			</div>
		)
	}
}