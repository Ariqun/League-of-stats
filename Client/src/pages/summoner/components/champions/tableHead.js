import React from 'react';

const TableHead = ({changeSort, sortBy}) => {
	const obj = {
		champ: 'Чемпион', 
		matches: 'Игры', 
		winrate: 'Винрейт', 
		kda: 'KDA', 
		creeps: 'Миньоны', 
		gold: 'Золото', 
		dmg: 'Урон', 
		heal: 'Лечение',
		vision: 'Обзор',
		wards: 'Тотемы'
	}

	const result = Object.keys(obj).map(title => {
		return(
			<td onClick={() => changeSort(title)} className={sortBy === title ? 'head_item active' : 'head_item'} key={title}>
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