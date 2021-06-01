import React from 'react';

import champStatistics from '../../../../components/languages/russian/champStatistics';

const TableHead = ({changeSort, sortBy}) => {
	const ruTitles = champStatistics();

	const result = Object.keys(ruTitles).map(title => {
		return(
			<td onClick={() => changeSort(title)} className={sortBy === title ? 'head_item active' : 'head_item'} key={title}>
				<div className="title">{ruTitles[title]}</div>
			</td>
		)
	})

	return(
		<tr className="table_head">
			{result}
		</tr>
	)
}

export default TableHead;