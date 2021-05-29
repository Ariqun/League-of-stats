import React from 'react';

import {checkNanAndDoubleZero} from '../manipulationsWithNums/checkNums';
import {findPercent} from '../manipulationsWithNums/findPercent';

import './index.sass'

const RateBar = ({current, max, pop = false}) => {
	const className = pop ? "progress_bar pop" : "progress_bar rate";
	const percent = checkNanAndDoubleZero(findPercent(current, max, 1));
	const min = max / 10;
	let value = current;

	if (current < min && current > 0) value = min;

	return(
		<div className={className}>
			<progress max={max} value={value}/>
			<span className="value">{percent}%</span>
		</div>
	)
}

export default RateBar;