import React, {Component} from 'react';

import AppHeader from '../app-header/app-header';
import Profile from '../profile/profile';
import AppBackground from '../app-background/app-background';

import './app.sass'

export default class App extends Component {
	render() {
		return (
			<>
				<AppHeader/>
				<Profile/>
	
				<AppBackground/>
			</>
		)
	}
}