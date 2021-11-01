import React from 'react';
import {useTranslation} from 'react-i18next';

import {transformDate} from '../../utils/actionsWithNums/transformTime';
import './errors.sass';

const StatisticsNotFound = ({matchAmount}) => {
	const [t] = useTranslation();

	const ms = Date.parse(new Date()) + (matchAmount * 3500);
	const date = transformDate(ms, true);

	return(
		<div className="data_not_found">
			<div>{t('statisticsNotFound')}.</div>
			<div>{t('yordleOnTheWay')}!</div>
			<div>{t('ifYouPlayed')}!</div>
			<div>{t('timeToSearching')}: <span className="date">{date}</span></div>
		</div>
	)
}

export default StatisticsNotFound;