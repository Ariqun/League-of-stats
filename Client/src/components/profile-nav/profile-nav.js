import React, {Component} from 'react';
import './profile-nav.sass';

export default class ProfileNav extends Component {
	render() {
		return (
			<div className="profile_nav">
				<ul>
					<li><a href="#">Обзор</a></li>
					<li><a href="#">Игры</a></li>
					<li><a href="#">Чемпионы</a></li>
					<li><a href="#">Рекорды</a></li>	
				</ul>
			</div>
		)
	}
}