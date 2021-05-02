import React from 'react';

const NavList = ({changeTab}) => {
	const ruArr = ['Общее', 'Умения', 'Скины', 'Билды', 'Статистика'];
	const engArr = ['general', 'skills','skins', 'builds', 'statistics'];
	
	const list = ruArr.map((item, i) => {
		const id = engArr[i]
		
		return(
			<li onClick={() => changeTab(id)} className="col-2" key={id}>
				<span>{item}</span>
			</li>
		)
	});
	
	return(
		<ul className='champion_nav'>
			{list}
		</ul>
	);
}

export default NavList;