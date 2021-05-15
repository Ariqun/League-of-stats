import React from 'react';

import {recordsRU} from '../../../../components/languages/russian/records';
import {checkBigNum} from '../../../../components/manipulationsWithNums/checkNums';
import {transformSeconds, transformDate} from '../../../../components/manipulationsWithNums/transformTime';

const Card = ({records}) => {
	const titles = recordsRU();

	const noData = (record, value) => {
		return(
			<div className="card col-2" key={record}>
				<div className="title">{titles[record]}</div>
				<div className="value">{value}</div>
				<div className="background">
					<img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Teemo_0.jpg`} alt={`Teemo_img`}/>
				</div>
			</div>
		)
	}

	const result = Object.keys(records).map(record => {
		let value = checkBigNum(records[record].value, 'digits');
		
		if (value === 0) return noData(record, value);
		if (record === 'CC') value = transformSeconds(records[record].value);

		const date = transformDate(records[record].date);
		const name = records[record].champName;
		const matchType = records[record].matchType;
		let type = '';

		if (matchType === 400) type = 'Обычная';
		if (matchType === 420) type = 'Одиночная';
		if (matchType === 440) type = 'Флекс';
		
		return(
			<div className="card col-2" key={record}>
				<div className="title">{titles[record]}</div>
				<div className="value">{value}</div>
				<div className="other">
					<div className="date">{date}</div>
					<div className="type">{type}</div>
				</div>
				<div className="background">
					<img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${name}_0.jpg`} alt={`${name}_img`}/>
				</div>
			</div>
		)
	})
	
	return result;
}

export default Card;