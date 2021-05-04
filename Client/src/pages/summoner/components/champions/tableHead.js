import React from 'react';

const TableHead = ({changeSort, sort}) => {
	const obj = {
		champ: 'Чемпион', 
		matches: 'Игры', 
		winrate: 'Винрейт', 
		kda: 'KDA', 
		creeps: 'Миньоны', 
		gold: 'Золото', 
		dmg: 'Урон', 
		heal: 'Лечение'
	}

	const result = Object.keys(obj).map(title => {
		return(
			<td onClick={() => changeSort(title)} className={sort === title ? 'head_item active' : 'head_item'} key={title}>
				<div className="title">{obj[title]}</div>
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