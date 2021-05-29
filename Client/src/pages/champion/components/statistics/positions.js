import React from 'react';

import RateBar from '../../../../components/progressBars/rateBar';

const Positions = ({roles, matches}) => {
	const positions = ['top', 'jungle', 'middle', 'bottom', 'utility'];
	const positionsRu = {top: 'Топ', jungle: 'Лес', middle: 'Мид', bottom: 'Бот', utility: 'Поддержка'};

	const result = positions.map(item => {
		let matchesAtPos = 0, winsAtPos = 0;

		for (let key in roles) {
			if (key === item) {
				if (roles[key][0]) {
					matchesAtPos = roles[key][0].matches;
					winsAtPos = roles[key][0].wins;
				} else {
					matchesAtPos = 0;
					winsAtPos = 0;
				}
			}
		}

		return (
			<tr className={`position ${item}`} key={item}>
				<td className="position_type">
					<img src={process.env.PUBLIC_URL + `/assets/icons/positions/${item}.png`} alt={`${item}_icon`}/>
					<span className="position_name">{positionsRu[item]}</span>
				</td>

				<td className="popularity">
					<RateBar current={matchesAtPos} max={matches} pop/>
				</td>

				<td className="winrate">
					<RateBar current ={winsAtPos} max={matchesAtPos}/>
				</td>
			</tr>
		);
	});

	return (
		<table className="positions">
			<tbody>
				<tr className="head">
					<th>Позиция</th>
					<th>Популярность</th>
					<th>Винрейт</th>
				</tr>
				{result}
			</tbody>
		</table>
	);
}

export default Positions;