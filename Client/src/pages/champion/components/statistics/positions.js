import React from 'react';

import RateBar from '../../../../components/progressBars/rateBar';
import positions from '../../../../components/languages/russian/positions';

const Positions = ({roles, matches}) => {
	const pos = ['top', 'jungle', 'middle', 'bottom', 'utility'];
	const ruPositions = positions();

	const result = pos.map(item => {
		const position = ruPositions[item];
		let matchesAtPos = 0, winsAtPos = 0;

		for (let key in roles) {
			if (key === item) {
				if (!roles[key][0]) continue;

				matchesAtPos = roles[key][0].matches;
				winsAtPos = roles[key][0].wins;
			}
		}

		return (
			<tr className={`position ${item}`} key={item}>
				<td className="position_type">
					<img src={process.env.PUBLIC_URL + `/assets/icons/positions/${item}.png`} alt={`${item}_icon`}/>
					<span className="position_name">{position}</span>
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