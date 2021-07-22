import React from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';

import ItemColumn from './itemColumn';

const ItemsBlock = ({champStats, items}) => {
	const champItems = champStats.items[0];
	const matches = champStats.matches;
	const [t] = useTranslation();
	
	delete champItems[0];

	const filterItems = (tag, main = false) => {
		const result = Object.keys(champItems).filter(item => {
			const exceptionItems = ['2010', '3330', '3400', '3513', '3599', '3600'];
			const {tags} = items[item];

			if (!main && tags.includes(tag) && item !== '3513') return item;
			if (main && !tags.includes('Boots') && !tags.includes('Trinket') && !tags.includes('Lane') && !tags.includes('Consumables') && !exceptionItems.includes(item)) return item;

			return null;
		});

		return result;
	}

	return(
		<div className="items_block">
			<div className="block_title">{t("itemPopularity")}</div>
			<div className="columns_wrapper">
				<ItemColumn champItems={champItems} blockItems={filterItems(null, true)} matches={matches} title={t('coreItems')} trigger />
				<ItemColumn champItems={champItems} blockItems={filterItems('Boots')} matches={matches} title={t('boots')} />
				<ItemColumn champItems={champItems} blockItems={filterItems('Trinket')} matches={matches} title={t('trinkets')} />
			</div>
		</div>
	)
}

const setStateToProps = (state) => {
	return {items: state.items}
}

export default connect(setStateToProps)(ItemsBlock);