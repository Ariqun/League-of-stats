import React from 'react';
import {connect} from 'react-redux';

import {findPercent} from '../../../../components/manipulationsWithNums/findPercent';
import itemTooltip from '../../../../components/tooltips/itemTooltip';

const ItemColumn = ({champItems, blockItems, matches, title, items, version}) => {
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
	
		return result.sort((a, b) => {return b.count - a.count});
	}
	const itemsArray = createAndModifyArray();

	const content = itemsArray.map(item => {
		const id = item.id;
		const count = item.count;
		const percent = findPercent(count, matches, 1);
		const tooltip = itemTooltip(items[id], version);
		
		return(
			<div className="item" key={id}>
				<div className="item_icon" data-tip={tooltip} data-for="tooltip">
					<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${id}.png`} alt={id}/>
				</div>

				<div className="popularity">
					<progress value={count} max={matches}/>
					<span className="value">{percent}%</span>
				</div>
			</div>
		)
	})

	return(
		<div className="item_column">
			<div className="column_title">{title}</div>
			{content}
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