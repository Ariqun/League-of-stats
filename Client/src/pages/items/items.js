import React, { useEffect, useState } from 'react';

import ItemBlock from './components/itemBlock';
import Types from './components/types';
import ShowItem from './components/showItem';

import DragonData from '../../services/dragonData';

const Items = ({version}) => {
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
	}, []);

	const toggleVision = (type) => {
		if (shownTypes.includes(type)) {
			const arr = shownTypes.filter(item => item !== type);
			changeShownTypes([...arr]);
		} else {
			changeShownTypes([...shownTypes, type]);
		}
	}

	return(
		<div className="items_page">
			<div className="container">
				<Types shownTypes={shownTypes} toggleVision={toggleVision}/>

				<div className="items">
					<div className="items_wrapper col-8">
						<ItemBlock version={version} items={items} setCurrentItem={setCurrentItem} tag={['Consumable', 'Trinket']} title={'Расходники'}/>
						<ItemBlock version={version} items={items} setCurrentItem={setCurrentItem} tag={'Boots'} title={'Сапоги'}/>
						<ItemBlock version={version} items={items} setCurrentItem={setCurrentItem} tag={shownTypes}title={'Предметы'}/>
					</div>

					
					<ShowItem items={items} version={version} name={currentItem}/>
				</div>
			</div>
		</div>
	)
}

export default Items;