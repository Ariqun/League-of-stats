import React from 'react';
import {useTranslation} from 'react-i18next';

const Tabs = ({changeTab, currentTab}) => {
	const [t] = useTranslation();
	const tabs = ['total', 'solos', 'flex', 'normals', 'clash'];
	
	const result = tabs.map(tab => {
		return(
			<div onClick={() => changeTab(`${tab}`)} className={currentTab === tab ? "tab active" : "tab"} key={tab}>
				{t(tab)}
			</div>
		)
	});

	return(
		<div className="tabs">
			{result}
		</div>
	);
}

export default Tabs;