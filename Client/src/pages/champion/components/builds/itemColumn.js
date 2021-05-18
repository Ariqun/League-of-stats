import React from 'react';
import ReactTooltip from 'react-tooltip';
import {connect} from 'react-redux';


import {findPercent} from '../../../../components/manipulationsWithNums/findPercent';
import itemTooltip from '../../../../components/tooltips/itemTooltip';

const ItemColumn = ({champItems, blockItems, matches, title, items, version}) => {
	const createAndModifyArray = () => {
		const result = [];

		for (let item of blockItems) {
			const bool = (!items[item].into || items[items[item].into[0]].requiredAlly);
			const bool2 = (!items[item].into || !items[items[item].into[0]].requiredAlly);
			// Подобная ересь нужна, чтобы не показывать улучшенный Орном шмот
			if (Object.keys(champItems).includes(item) && bool && bool2) {
				result.push({
					id: item,
					count: champItems[item]
				})
			}
		}
	
		result.sort((a, b) => {
			return b.count - a.count;
		});

		return result;
	}
	const itemsArray = createAndModifyArray();

	const content = itemsArray.map(item => {
		const id = item.id;
		const count = item.count;
		const percent = findPercent(count, matches, 1);
		const tool = itemTooltip(items[id], version);
		
		return(
			<div className="item" key={id}>
				<div className="item_icon" data-tip={tool} data-for="item_tooltip">
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
			<ReactTooltip id="item_tooltip" html/>
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