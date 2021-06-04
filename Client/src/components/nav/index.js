import React from 'react';
import {useTranslation} from 'react-i18next';

import SkyblueBtn from '../buttons/skyblueBtn';

import './index.sass';

const Nav = ({changeTab, titles}) => {
	const [t] = useTranslation();

	const content = titles.map(title => {
		return(
			<li onClick={() => changeTab(title)} className="col-2" key={title}>
				<SkyblueBtn text={t(title)}/>
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