import React from 'react';
import {useTranslation} from 'react-i18next';

import SkyblueBtn from '../buttons/skyblueBtn';

import './index.sass';

const Nav = ({changeTab, titles, tab}) => {
	const [t] = useTranslation();

	const content = titles.map(title => {
		let active = false;

		if (title === tab) active = true;

		return(
			<li onClick={() => changeTab(title)} className="col-2" key={title}>
				<SkyblueBtn text={t(title)} active={active}/>
			</li>
		)
	});
	
	return(
		<ul className='nav'>
			{content}
		</ul>
	);
}

export default Nav;