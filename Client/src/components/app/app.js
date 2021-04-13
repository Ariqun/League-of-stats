import React from 'react';

import AppHeader from '../app-header/app-header';
import Profile from '../profile/profile';
import AppBackground from '../app-background/app-background';

import './app.css'

const App = () => {
	return (
		<>
			<AppHeader/>
			<Profile/>

			<AppBackground/>
		</>
	)
}

export default App