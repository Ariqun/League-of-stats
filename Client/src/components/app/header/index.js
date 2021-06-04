import React from 'react';

import Form from './form';
import Nav from './nav';
import ChangeLanguage from './changeLanguage';

import './index.sass';

function Header({changeLang}) {
	return (
		<div className="header">
			<div className="container">
				<Nav />
				<Form />
				<ChangeLanguage changeLang={changeLang}/>
			</div>
		</div>
	)
}

export default Header;