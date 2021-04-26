import React, { useEffect, useState } from 'react';

import DragonData from '../../services/dragonData';

import './itemsPage.sass';

function ItemsPage({version}) {
	const [items, setItems] = useState({});

	const dragonData = new DragonData();
	
	useEffect(() => {
		const getItems = async () => {
			const res = await dragonData.getAllItems();
			setItems(res.data);
		}
		getItems();
	}, [])


	const itemBlock = () => {
		console.log(items)

		const content = Object.keys(items).map(key => {
			return (
				<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${items[key].image.full}`} alt={key}></img>
			)
		})

		return content;
	}

	const render = () => {
		return(
			<div className="items_page">
				<div className="container">
					<div className="roles">
					</div>


					{itemBlock()}
				</div>
			</div>
		)
	}

	return render();
}

export default ItemsPage;