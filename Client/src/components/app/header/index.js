import React from 'react';

import Form from './form';
import Nav from './nav';
import ChangeLanguage from './changeLanguage';

import './index.sass';

const Header = ({changeLang}) => {
	return (
		<div className="header">
			<div className="container-xxl">
				<Nav />
				
				<div className="forms">
					<Form />
					<ChangeLanguage changeLang={changeLang}/>
				</div>
			</div>
		</div>
	)
}

export default Header;