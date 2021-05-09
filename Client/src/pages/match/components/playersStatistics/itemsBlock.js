import React, {useState, useEffect} from 'react';
import ReactTooltip from 'react-tooltip';

import Loading from '../../../../components/loading';
import {transformMS} from '../../../../components/transformNums';

import DragonData from '../../../../services/dragonData';

const ItemsBlock = ({info, tab, version}) => {
	const [isLoading, changeLoading] = useState(true);
	const [items, setItems] = useState({});
	const timeline = info.timeline[tab].itemPurchase;
	const dd = new DragonData(version);

	useEffect(() => {
		const getItmes = async () => {
			const res = await dd.getAllItems();
			setItems(res);
			changeLoading(false);
		}

		getItmes();
	}, [])

	if (isLoading) return <Loading />

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
			let descr = items[item2].description.replace(/<attention>(\s?\w+%?)<\/attention>/gi, (match, m1) => {
				return `<span>+${m1}</span>`;
			})

			return(
				<div className="item" data-tip={descr} data-for="item_tooltip" key={`${item}_${item2}_${j}`}>
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
			<div className="title">Предметы</div>
			<div className="items">
				{result}
			</div>
			<ReactTooltip id="item_tooltip" html/>
		</div>
	)
}

export default ItemsBlock;