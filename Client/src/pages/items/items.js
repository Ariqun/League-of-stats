import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';

import ItemBlock from './components/itemBlock';
import Types from './components/types';
import ShowItem from './components/showItem';

import DragonData from '../../services/dragonData';

const Items = ({version}) => {
	const [items, setItems] = useState([]);
	const [currentItem, setCurrentItem] = useState('Зелье здоровья');
	const [shownTypes, changeShownTypes] = useState(['Damage', 'AttackSpeed', 'SpellDamage', 'CooldownReduction', 'Health', 'Armor', 'SpellBlock', 'NonbootsMovement']);

	const dd = new DragonData(version);
	
	useEffect(() => {
		const getItems = async () => {
			const res = await dd.getAllItems();

			let result = Object.keys(res).map(key => {
				return res[key];
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
	};

	return(
		<div className="items_page">
			<div className="container">
				<Types shownTypes={shownTypes} toggleVision={toggleVision}/>

				<div className="items">
					<div className="items_wrapper col-8">
						<ItemBlock items={items} setCurrentItem={setCurrentItem} tag={['Consumable', 'Trinket']} title={'Расходники'}/>
						<ItemBlock items={items} setCurrentItem={setCurrentItem} tag={'Boots'} title={'Сапоги'}/>
						<ItemBlock items={items} setCurrentItem={setCurrentItem} tag={shownTypes}title={'Предметы'}/>
					</div>

					
					<ShowItem items={items} name={currentItem}/>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {version: state.version};
}

export default connect(mapStateToProps)(Items);