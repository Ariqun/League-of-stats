import React from 'react';

import SkyblueBtn from '../buttons/skyblueBtn';
import sumNav from '../languages/russian/sumNav';
import champNav from '../languages/russian/champNav';

import './index.sass';

const Nav = ({changeTab, type, titles}) => {
	let ruTitles = '';
	if (type === 'champNav') ruTitles = champNav();
	if (type === 'sumNav') ruTitles = sumNav();

	const content = titles.map(title => {
		const ruTitle = ruTitles[title];
		
		return(
			<li onClick={() => changeTab(title)} className="col-2" key={title}>
				<SkyblueBtn text={ruTitle}/>
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