import React from 'react';
import {useTranslation} from 'react-i18next';

const AvgBlock = ({type, value, combo = false}) => {
	const [t] = useTranslation();
	let cols = 'col-6';

	if (combo) cols = 'col-3';

	return(
		<div className={`avg_stat ${cols}`}>
			<span className="title">{t(type)}</span>
			<span className="value">{value}</span>
		</div>
	)
}

export default AvgBlock;
