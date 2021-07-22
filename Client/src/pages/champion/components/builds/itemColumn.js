import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';

import RateBar from '../../../../components/progressBars/rateBar';
import itemTooltip from '../../../../components/tooltips/itemTooltip';

const ItemColumn = ({champItems, blockItems, matches, title, items, version, trigger = false}) => {
	const [isShowAll, setShowAll] = useState(false);
	const [t] = useTranslation();

	const createAndModifyArray = () => {
		const result = [];

		for (let item of blockItems) {
			// Подобная ересь нужна, чтобы показывать только полные и не улучшенные Орном предметы
			const onlyFullItems = !items[item].into || items[items[item].into[0]].requiredAlly;
			const dontShowOrnn = !items[item].requiredAlly;
			
			if (Object.keys(champItems).includes(item) && onlyFullItems && dontShowOrnn) {
				result.push({
					id: item,
					count: champItems[item]
				})
			}
		}
	
		return result.sort((a, b) => b.count - a.count);
	}
	const itemsArray = createAndModifyArray();

	const content = itemsArray.map((item, i) => {
		const {id, count} = item;
		const tooltip = itemTooltip(items[id], version);
		let className = 'item';

		if (!isShowAll && i >= 10) className = 'item hidden';

		return(
			<div className={className} key={id}>
				<div className="item_icon" data-tip={tooltip} data-for="tooltip">
					<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${id}.png`} alt={id}/>
				</div>

				<RateBar current={count} max={matches} pop/>
			</div>
		);
	});

	const showAllItems = () => {
		if (isShowAll || trigger === false) return null;
		
		return(
			<div onClick={() => setShowAll(true)} className="show_all">
				{t('showAll')}
			</div>
		)
	}

	return(
		<div className="item_column">
			<div className="column_title">{title}</div>
			{content}
			{showAllItems()}
		</div>
	)
}

const setStateToProps = (state) => {
	return {
		version: state.version,
		items: state.items
	}
}

export default connect(setStateToProps)(ItemColumn);