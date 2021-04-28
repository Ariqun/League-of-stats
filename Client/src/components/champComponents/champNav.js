import React from 'react';

function ChampNav({changeTab}) {
	const list = () => {
		const ruArr = ['Общее', 'Умения', 'Скины', 'Билды', 'Статистика'];
		const engArr = ['general', 'skills','skins', 'builds', 'stats'];
		
		const list = ruArr.map((item, i) => {
			const id = engArr[i]
			
			return(
				<li onClick={() => changeTab(id)} className="col-2" key={id}><span>{item}</span></li>
			)
		});
		
		return list;
	}

	const render = () => {
		return(
			<ul className='champion_nav'>
				{list()}
			</ul>
		)
	}

	return render();
}

export default ChampNav;