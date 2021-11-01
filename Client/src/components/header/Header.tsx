import React from 'react';

import Container from '../layouts/Container';
import Navigation from '../Navigation';
import cl from './Header.module.sass';

const Header: React.FC = () => {
	const nav = [
		{ path: '/', text: 'champs' },
		{ path: '/items', text: 'items' },
		{ path: '/runes', text: 'runes' },
	]

	return (
		<div className={cl.header}>
			<Container>
				<Navigation tabs={nav} />
				
				<div className="forms">
					{/* <Form /> */}
					{/* <ChangeLanguage changeLang={changeLang}/> */}
				</div>
			</Container>
		</div>
	)
}

export default Header;