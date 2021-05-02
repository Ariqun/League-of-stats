import React from 'react';

const NavList = ({changeTab}) => {
	const ruArr = ['Игры', 'Чемпионы', 'Рекорды', 'Статистика'];
	const engArr = ['matches','champs', 'records', 'stat'];

	const list = ruArr.map((item, i) => {
		const id = engArr[i];
		
		return(
			<li onClick={() => changeTab(id)} key={id}>
				<span>{item}</span>
			</li>
		)
	});

	return(
		<ul className='sum_nav'>
			{list}
		</ul>
	);
}

export default NavList;