import React from 'react';
import {useTranslation} from 'react-i18next';

import {checkBigNum} from '../../../../components/actionsWithNums/checkNums';

const StatNumbers = ({champs, type}) => {
	const [t] = useTranslation();

	const statsBlock = () => {
		const stats = ['kills', 'deaths', 'assists', 'dmg', 'healAndShields', 'creeps', 'gold'];
		const statObj = {kills: 0, deaths: 0, assists: 0, dmg: 0, healAndShields: 0, creeps: 0, gold: 0};
		
		for (let key in champs) {
			if (champs[key][type] === undefined) continue;

			const {kda, dmg, heal, creeps, gold} = champs[key][type];
			const {kills, deaths, assists} = kda;
			const {physical, magic, trueDmg} = dmg;
			const {restore, shield} = heal;
			const damage = physical + magic + trueDmg;
			const healing = restore + shield;

			statObj.kills += kills;
			statObj.deaths += deaths;
			statObj.assists += assists;
			statObj.dmg += damage;
			statObj.healAndShields += healing;
			statObj.creeps += creeps;
			statObj.gold += gold;
		}

		const sum = Object.keys(statObj).reduce((acc, el) => acc += statObj[el], 0);

		if (sum === 0) return <div className="no_data">{t('noData')}</div>;

		const content = stats.map(stat => {
			return(
				<div className="stat" key={stat}>
					<div className="title">{t(stat)}</div>
					<div className="value">{checkBigNum(statObj[stat], 'digits')}</div>
				</div>
			)
		})

		return content;
	}
	
	return(
		<div className="stats_type">
			<div className="type" key={type}>
				{statsBlock()}
			</div>
		</div>
	)
}

export default StatNumbers;