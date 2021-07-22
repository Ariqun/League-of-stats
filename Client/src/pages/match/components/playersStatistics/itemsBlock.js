import React from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';

import itemTooltip from '../../../../components/tooltips/itemTooltip';
import {transformMS} from '../../../../components/actionsWithNums/transformTime';

const ItemsBlock = ({info, tab, version, items}) => {
	const timeline = info.timeline[0][tab].itemPurchase;
	const [t] = useTranslation();
	
	const transformArrToObj = () => {
		let result = timeline.reduce((acc, item) => {
			let existing = acc.filter(item2 => Math.abs(item2.time - item.time) < 60000)[0];

			if (!existing) {
				acc.push({
					time: item.time, 
					value: [item.item]
				})
			} else {
				existing.value.push(item.item);
			}

			return acc;
		}, []).reduce((acc, item) => (acc[item.time] = item.value, acc), {});
		 
		return result;
	}
	const obj = transformArrToObj();

	const result = Object.keys(obj).map((item, i) => {
		const res = obj[item].map((item2, j) => {
			const tooltip = itemTooltip(items[item2], version);

			return(
				<div className="item" data-tip={tooltip} data-for="tooltip" key={`${item}_${item2}_${j}`}>
					<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item2}.png`} alt={`${item2}_icon`}/>
				</div>
			)
		})

		return(
			<div className="purchase" key={`${item}_${i}`}>
				<div className="wrapper">
					{res}
				</div>
				<div className="time">{transformMS(item, 'digits')}</div>
			</div>
		);
	})

	return(
		<div className="items_block">
			<div className="title">{t('items')}</div>
			<div className="items">
				{result}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		version: state.version,
		items: state.items
	};
}

export default connect(mapStateToProps)(ItemsBlock);