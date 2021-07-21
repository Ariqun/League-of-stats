import React from 'react';
import {useTranslation} from 'react-i18next';

import {checkBigNum} from '../../../../components/actionsWithNums/checkNums';
import {transformSeconds, transformDate} from '../../../../components/actionsWithNums/transformTime';

const Card = ({records}) => {
	const [t] = useTranslation();
	const titles = ['kills', 'deaths', 'assists', 'kda', 'dmg', 'healAndShields', 'creeps', 'gold', 'vision', 'wards', 'dmgTaken', 'CC', 'killingSpree', 'double', 'triple', 'quadra', 'penta'];

	const noData = (record, value) => {
		const title = titles.find(item => item === record);

		return(
			<div className="card col-2" key={record}>
				<div className="title">{t(title)}</div>
				<div className="value">{value}</div>
				<div className="background">
					<img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Teemo_0.jpg`} alt={`Teemo_img`}/>
				</div>
			</div>
		)
	}
	
	const result = Object.keys(records).map(record => {
		const {value, date, champName, matchType} = records[record];

		if (value === 0) return noData(record, value);

		const title = titles.find(item => item === record);
		const matchDate = transformDate(date);
		let num = checkBigNum(value, 'digits');
		
		if (record === 'CC') num = transformSeconds(value);

		return(
			<div className="card col-2" key={record}>
				<div className="title">{t(title)}</div>
				<div className="value">{num}</div>
				<div className="other">
					<div className="date">{matchDate}</div>
					<div className="type">{t(matchType)}</div>
				</div>
				<div className="background">
					<img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champName}_0.jpg`} alt={`${champName}_img`}/>
				</div>
			</div>
		)
	})
	
	return <div className="block">{result}</div>;
}

export default Card;