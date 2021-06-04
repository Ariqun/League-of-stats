import React from 'react';
import {useTranslation} from 'react-i18next';

import RunesColumn from './runesColumn';

const RunesBlock = ({champStats}) => {
	const [t] = useTranslation();
	const runes = champStats.runes[0];
	const matches = champStats.matches;

	const createAndModifyArray = () => {
		const result = [];

		for (let key in runes) {
			result.push({[key]: runes[key]})
		}
	
		result.sort((a, b) => {
			const aObj = a[Object.keys(a)[0]];
			const bObj = b[Object.keys(b)[0]];
	
			const aMax = Math.max(...Object.values(aObj));
			const bMax = Math.max(...Object.values(bObj));
			
			return bMax - aMax;
		});

		return result;
	}
	
	const sortedRunes = createAndModifyArray();

	const content = sortedRunes.map(elem => {
		const styles = Object.keys(elem)[0];

		return <RunesColumn styles={styles} perks={runes[styles]} matches={matches} key={styles}/>
	})

	return(
		<div className="runes_block">
			<div className="block_title">{t('runesPopularity')}</div>
			<div className="columns_wrapper">
				{content}
			</div>
		</div>
	)
}

export default RunesBlock;