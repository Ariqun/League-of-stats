import React from 'react';

import {checkBigNums} from '../../../../components/chekNums';

const StatNumbers = ({stats}) => {
	const statsBlock = (type) => {
		let statObj = {totalKills: 0, totalDeaths: 0, totalAssists: 0, totalDMG: 0, totalHeal: 0, totalCS: 0, totalGold: 0};
		let rusTitles = {totalKills: 'Убийства', totalDeaths: 'Смерти', totalAssists: 'Помощь', totalDMG: 'Урон', totalHeal: 'Лечение и щиты', totalCS: 'Миньоны', totalGold: 'Золото'};
		
		for (let key in stats) {
			if (stats[key][type] === undefined) continue;

			const {kda, dmg, heal, cs, gold} = stats[key][type];
			const {kills, deaths, assists} = kda;
			const {physical, magic, trueDmg} = dmg;
			const {restore, shield} = heal;
			const damage = physical + magic + trueDmg;
			const healing = restore + shield;

			statObj.totalKills += kills;
			statObj.totalDeaths += deaths;
			statObj.totalAssists += assists;
			statObj.totalDMG += damage;
			statObj.totalHeal += healing;
			statObj.totalCS += cs;
			statObj.totalGold += gold;
		}

		const sum = Object.keys(statObj).reduce((acc, el) => {
			return acc += statObj[el];
		}, 0)

		if (sum === 0) return <div className="no_data">Нет данных</div>;

		const result = Object.keys(statObj).map(stat => {
			return(
				<div className="stat" key={stat}>
					<div className="title">{rusTitles[stat]}</div>
					<div className="value">{checkBigNums(statObj[stat], 'digits')}</div>
				</div>
			)
		})

		return result;
	}
	
	return(
		<div className="stats_type">
			<div className="type total">
				<div className="type_title">Ранговые и обычные</div>
				{statsBlock('total')}
			</div>

			<div className="type solo">
				<div className="type_title">Одиночные</div>
				{statsBlock('solo')}
			</div>

			<div className="type flex">
				<div className="type_title">Флекс</div>
				{statsBlock('flex')}
			</div>

			<div className="type normal">
				<div className="type_title">Обычные</div>
				{statsBlock('normal')}
			</div>
		</div>
	)
}

export default StatNumbers;