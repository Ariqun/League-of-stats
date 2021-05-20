import React from 'react';
import {connect} from 'react-redux';

import itemTooltip from '../../../../components/tooltips/itemTooltip';

const PlayerItems = ({player, items, version}) => {
	let itemIds = [];
	
	for(let key in player) {
		if (key.match(/item[\d]/)) {
			itemIds.push(player[key]);
		}
	}
	
	return(
		<div className="items_block">
			{itemIds.map((itemId, i) => {
				if (itemId === 0) return <div className="item" key={`${itemId}_${i}`}/>;

				const tooltip = itemTooltip(items[itemId], version);

				return(
					<div className="item" data-tip={tooltip} data-for="tooltip" key={`${itemId}_${i}`}>
						<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemId}.png`} alt={`${itemId}_icon`}/>
					</div>
				);
			})}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		version: state.version,
		items: state.items
	}
}

export default connect(mapStateToProps)(PlayerItems);