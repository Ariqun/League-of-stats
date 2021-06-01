import React from 'react';

const Tabs = ({changeTab, currentTab}) => {
	const tabs = [{total: 'Ранговые, обычные и clash'}, {solo: 'Одиночные'}, {flex: 'Флекс'}, {normal: 'Обычные'}, {clash: 'Clash'}];
	
	const result = tabs.map(tab => {
		const name = Object.keys(tab)[0];
		const descr = tab[Object.keys(tab)];
		
		return(
			<div onClick={() => changeTab(`${name}`)} className={currentTab === name ? "tab active" : "tab"} key={name}>{descr}</div>
		)
	});

	return(
		<div className="tabs">
			{result}
		</div>
	);
}

export default Tabs;