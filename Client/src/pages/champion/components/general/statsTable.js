import React from 'react';
import {useTranslation} from 'react-i18next';

const StatsTable = ({stats}) => {
	const [t] = useTranslation();
	const sortedStats = [];

	const sortArr = () => {
		// Такая наркомания нужна для правильного формирования окончательной таблицы
		for (let key in stats) {
			if (key !== 'attackrange' && key !== 'movespeed' && key !== 'attackspeedperlevel') {
				sortedStats.push(`${t(key)}: ${stats[key]}`);
			}
		}

		for (let key in stats) {
			if (key === 'attackspeedperlevel') {
				sortedStats.push(`${t(key)}: ${stats[key]}`);
			}
		}

		for (let key in stats) {
			if (key === 'attackrange' || key === 'movespeed') {
				sortedStats.push(`${t(key)}: ${stats[key]}`);
			}
		}
	}
	sortArr();

	const content = (name, value, right = false) => {
		const className = right ? "stat right" : "stat left";
		let str = `${name} - `;

		if (right) str = ` - ${name}`;

		return(
			<div className={className} key={name}>
				<span className="name">{str}</span>
				<span className="value">{value}</span>
			</div>
		)
	}

	const table = sortedStats.map((item, i) => {
		const name = item.split(':')[0];
		const value = item.split(':')[1];

		if (i % 2 === 0) return content(name, value);

		return content(name, value, true);
	})

	return(
		<div className="stats">
			{table}
		</div>
	)
}

export default StatsTable;