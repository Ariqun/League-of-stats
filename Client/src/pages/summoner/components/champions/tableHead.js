import React from 'react';

import {champStatistics} from '../../../../components/languages/russian/champ';

const TableHead = ({changeSort, sortBy}) => {
	const titles = ['champ', 'matches', 'winrate', 'kda', 'creeps', 'gold', 'dmg', 'heal', 'vision'];
	let ruTitles = champStatistics();

	const content = titles.map(title => {
		const ruTitle = ruTitles[title];

		return(
			<td onClick={() => changeSort(title)} className={sortBy === title ? 'head_item active' : 'head_item'} key={title}>
				<div className="title">{ruTitle}</div>
			</td>
		)
	})

	return(
		<tr className="table_head">
			{content}
		</tr>
	)
}

export default TableHead;