import React from 'react';

import Promo from '../profile-promo/profile-promo';
import ProfileNav from '../profile-nav/profile-nav';

import './profile.css';

const Profile = () => {
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

export default Profile