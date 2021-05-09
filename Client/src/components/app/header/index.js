import React from 'react';

import Form from './form';
import Nav from './nav';

import './index.sass';

function Header() {
	return (
		<div className="header">
			<div className="container">
				<Nav />
				<Form />
			</div>
		</div>
	)
}

export default Header;