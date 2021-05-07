import React, {useState, useEffect} from 'react';

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

	const fuckIt = () => {
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
	const obj = fuckIt();
	console.log(obj)

	const result = Object.keys(obj).map((item, i) => {
		const res = obj[item].map((item2, j) => {
			return(
				<div className="item" key={`${item}_${item2}_${j}`}>
					<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item2}.png`} alt={`${item2}_icon`}/>
				</div>
			)
		})

		return(
			<div className="purchase" key={`${item}_${i}`}>
				{res}
			</div>
		);
	})

	return(
		<div className="items_block">
			{result}
		</div>
	)
}

export default ItemsBlock;