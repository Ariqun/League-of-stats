import React from 'react';

import {checkBigNum} from '../../../../components/manipulationsWithNums/checkNums';
import sumStatistics from '../../../../components/languages/russian/sumStatistics';

const StatNumbers = ({stats}) => {
	const arrayOfTypes = ['total', 'solo', 'flex', 'normal'];

	const statsBlock = (type) => {
		let statObj = {totalKills: 0, totalDeaths: 0, totalAssists: 0, totalDMG: 0, totalHeal: 0, totalCS: 0, totalGold: 0};
		let rusTitles = sumStatistics();
		
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

		const sum = Object.keys(statObj).reduce((acc, el) => acc += statObj[el], 0);

		if (sum === 0) return <div className="no_data">Нет данных</div>;

		const result = Object.keys(statObj).map(stat => {
			return(
				<div className="stat" key={stat}>
					<div className="title">{rusTitles[stat]}</div>
					<div className="value">{checkBigNum(statObj[stat], 'digits')}</div>
				</div>
			)
		})

		return result;
	}

	const content = arrayOfTypes.map(type => {
		return(
			<div className="type" key={type}>
				{statsBlock(type)}
			</div>
		)
	});
	
	return(
		<div className="stats_type">
			{content}
		</div>
	)
}

export default StatNumbers;