import React, {useState} from 'react';

import ItemBlock from './components/itemBlock';
import Types from './components/types';
import ShowItem from './components/showItem';

const Items = () => {
	const [currentItem, setCurrentItem] = useState('Зелье здоровья');
	const [shownTypes, changeShownTypes] = useState(['Damage', 'AttackSpeed', 'SpellDamage', 'CooldownReduction', 'Health', 'Armor', 'SpellBlock', 'NonbootsMovement']);

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
						<ItemBlock setCurrentItem={setCurrentItem} tag={['Consumable', 'Trinket']} title={'Расходники'}/>
						<ItemBlock setCurrentItem={setCurrentItem} tag={'Boots'} title={'Сапоги'}/>
						<ItemBlock setCurrentItem={setCurrentItem} tag={shownTypes} title={'Предметы'}/>
					</div>
					
					<ShowItem name={currentItem}/>
				</div>
			</div>
		</div>
	)
}

export default Items;