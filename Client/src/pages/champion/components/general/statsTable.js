import React from 'react';
import {useTranslation} from 'react-i18next';

const StatsTable = ({stats}) => {
	const [t] = useTranslation();
	const sortedStats = [];

	// Такая наркомания нужна для правильного формирования окончательной таблицы,
	// Чтобы родственный статы отображались друг напротив друга в верстке (Здоровье - здоровье за уровень), т.к. изначально они приходят в хаотичном порядке.
	// Чтобы лучше понять логику вещей, лучше посмотреть на отрисованный компонент в браузере.
	const sort = (arr, bool) => {
		for (let key in stats) {
			if (arr.includes(key) === bool) {
				sortedStats.push(`${t(key)}: ${stats[key]}`);
			}
		}
	}
	sort(['attackrange', 'movespeed', 'attackspeedperlevel'], false);
	sort(['attackspeedperlevel'], true);
	sort(['attackrange', 'movespeed'], true);

	const content = (name, value, right) => {
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
		const arr = item.split(':');
		const [name, value] = arr;

		if (i % 2 === 0) return content(name, value, false);

		return content(name, value, true);
	})

	return(
		<div className="stats">
			{table}
		</div>
	)
}

export default StatsTable;