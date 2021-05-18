import React from 'react';
import {connect} from 'react-redux';

import ItemColumn from './itemColumn';

const ItemsBlock = ({champStats, items}) => {
	const matches = champStats.matches;
	const champItems = champStats.items[0];
	delete champItems[0];

	const filterItems = (tag, main = false) => {
		const result = Object.keys(champItems).filter(item => {
			const tags = items[item].tags;

			if (!main && tags.includes(tag)) return item;
			if (main && !tags.includes('Boots') && !tags.includes('Trinket') && !tags.includes('Lane')) return item;

			return null;
		});

		return result;
	}

	return(
		<div className="items_block">
			<div className="block_title">Популярность предметов</div>
			<div className="columns_wrapper">
				<ItemColumn champItems={champItems} blockItems={filterItems(null, true)} matches={matches} title={'Основные предметы'}/>
				<ItemColumn champItems={champItems} blockItems={filterItems('Boots')} matches={matches} title={'Ботинки'}/>
				<ItemColumn champItems={champItems} blockItems={filterItems('Trinket')} matches={matches} title={'Триньки'}/>
			</div>
		</div>
	)
}

const setStateToProps = (state) => {
	return {items: state.items}
}

export default connect(setStateToProps)(ItemsBlock);