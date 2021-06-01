import React from 'react';

import {transformDate} from '../manipulationsWithNums/transformTime';

import './errors.sass';

const StatisticsNotFound = ({matchAmount}) => {
	const ms = Date.parse(new Date()) + (matchAmount * 3500);
	const date = transformDate(ms, true);

	return(
		<div className="data_not_found">
			<div>Статистика по ранговым и обычным играм не найдена.</div>
			<div>Поисковые отряды йордлов собраны и уже в пути!</div>
			<div>Если вы принимали участие в ранговых или обычных играх, то они обязательно что-нибудь найдут!</div>
			<div>Расчетное время окончания поисков: <span className="date">{date}</span></div>
		</div>
	)
}

export default StatisticsNotFound;