import React from 'react';
import {champStatistics} from '../../../../components/languages/russian/champ';

const AvgBlock = ({type, value, combo = false}) => {
	const ruTitles = champStatistics();
	const title = ruTitles[type];
	let cols = 'col-6';

	if (combo) cols = 'col-3';

	return(
		<div className={`avg_stat ${cols}`}>
			<span className="title">{title}</span>
			<span className="value">{value}</span>
		</div>
	)
}

export default AvgBlock;
