import React from 'react';

import {checkNanAndDoubleZero} from '../../../../components/chekNums';

const Positions = ({roles, matches}) => {
	const positions = ['top', 'jungle', 'middle', 'adc', 'support'];
	const positionsRu = {top: 'Топ', jungle: 'Лес', middle: 'Мид', adc: 'Бот', support: 'Поддержка'};

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

		const popPercent = checkNanAndDoubleZero((matchesAtPos * 100 / matches).toFixed(1));
		const winPercent = checkNanAndDoubleZero((winsAtPos * 100 / matchesAtPos).toFixed(1));

		return (
			<tr className={`position ${item}`} key={item}>
				<td className="position_type">
					<img src={process.env.PUBLIC_URL + `/assets/icons/positions/${item}.png`} alt={`${item}_icon`}/>
					<span className="position_name">{positionsRu[item]}</span>
				</td>

				<td className="popularity">
					<progress max="100" value={popPercent}/>
					<span className="value">{popPercent}%</span>
				</td>

				<td className="winrate">
					<progress max="100" value={winPercent}/>
					<span className="value">{winPercent}%</span>
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