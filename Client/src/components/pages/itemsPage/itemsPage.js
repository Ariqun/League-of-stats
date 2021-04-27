import React, { useEffect, useState } from 'react';
import ItemBlock from '../../itemComponents/itemBlock';

import DragonData from '../../services/dragonData';

import './itemsPage.sass';

function ItemsPage({version}) {
	const [items, setItems] = useState([]);
	const [currentItem, setCurrentItem] = useState('Зелье здоровья');
	const [shownTypes, changeShownTypes] = useState(['Damage', 'AttackSpeed', 'SpellDamage', 'CooldownReduction', 'Health', 'Armor', 'SpellBlock', 'NonbootsMovement']);

	const dragonData = new DragonData();
	
	useEffect(() => {
		const getItems = async () => {
			const res = await dragonData.getAllItems();

			let result = Object.keys(res.data).map(key => {
				return res.data[key];
			})

			result.sort((a, b) => {
				return a.gold.total - b.gold.total;
			})

			setItems(result);
		}
		getItems();
	}, [])

	const typesBlock = () => {
		const arrOfTypes = ['Damage', 'AttackSpeed', 'SpellDamage', 'CooldownReduction', 'Health', 'Armor', 'SpellBlock', 'NonbootsMovement'];

		const types = arrOfTypes.map(type => {
			const opacity = shownTypes.includes(type);

			return(
				<div onClick={() => toggleVision(type)} className={opacity ? 'type' : 'type inactive'} key={type}>
					<img src={`${process.env.PUBLIC_URL}/assets/icons/stats/${type}.png`}
					  	 alt={`type_${type}`} 
					 	 title={type}>
					</img>
				</div>
			)
		})

		return types;

	}

	const toggleVision = (type) => {
		if (shownTypes.includes(type)) {
			const arr = shownTypes.filter(item => item !== type);
			changeShownTypes([...arr]);
		} else {
			changeShownTypes([...shownTypes, type]);
		}
	}

	const showItem = (name) => {
		const result = items.map(item => {
			if (item.name !== name) return null;

			let descr = item.description.replace(/<attention>(\s?\w+%?)<\/attention>/gi, (match, m1) => {
				return `<span>+${m1}</span>`;
			})

			descr = descr.replace(/<hr>/gi, '<br>');

			return(
				<div className="item_extend_wrapper" key={name}>
					<div className="title">
						<div className="item_icon">
							<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`} alt={item.name}></img>
						</div>
						<div className="name_and_cost">
							<span className="name">{item.name}</span>
							<span className="cost">Цена: <span className="value">{item.gold.total}</span></span>
						</div>
					</div>

					<div className="descr" dangerouslySetInnerHTML={{__html: descr}}></div>
				</div>
			)
		})

		return result;
	}

	const render = () => {
		console.log(items)

		return(
			<div className="items_page">
				<div className="container">
					<div className="types col-8">
						{typesBlock()}
					</div>

					<div className="items">
						<div className="items_wrapper col-8">
							<ItemBlock version={version} items={items} setCurrentItem={setCurrentItem} tag={['Consumable', 'Trinket']} title={'Расходники'}/>
							<ItemBlock version={version} items={items} setCurrentItem={setCurrentItem} tag={'Boots'} title={'Сапоги'}/>
							<ItemBlock version={version} items={items} setCurrentItem={setCurrentItem} tag={shownTypes}title={'Предметы'}/>
						</div>

						
						<div className="item_extend col-4">
							{showItem(currentItem)}
						</div>
					</div>
				</div>
			</div>
		)
	}

	return render();
}

export default ItemsPage;