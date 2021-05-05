import React from 'react';
import {addZero} from '../../../../components/addZeros';
import {checkThousand} from '../../../../components/chekNums';
import {transformMS, transformDate} from '../../../../components/transformNums';

const Card = ({records}) => {
	const titles = {
		kills: 'Убийства',
		deaths: 'Смерти',
		assists: 'Помощь',
		kda: 'KDA',
		dmg: 'Урон',
		heal: 'Лечение и щиты',
		cs: 'Миньоны',
		gold: 'Золото',
		vision: 'Обзор',
		wards: 'Тотемы',
		dmgTaken: 'Урона получено',
		CC: 'Время контроля',
		killingSpree: 'Цепочка убийств',
		double: 'Даблкиллы',
		triple: 'Триплкиллы',
		quadra: 'Квадракиллы',
		penta: 'Пентакиллы'
	}

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
		let value = checkThousand(records[record].value);
		
		if (value === 0) return noData(record, value);
		if (record === 'CC') value = transformMS(records[record].value);

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