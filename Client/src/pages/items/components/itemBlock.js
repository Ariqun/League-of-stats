import React from 'react';
import {connect} from 'react-redux';

import transformAndSort from './transfromAndSort';

const ItemBlock = ({setCurrentItem, inputValue, type, title, items, version}) => {
	const arrOfItems = transformAndSort(items);
	const exceptions = ['Чучело', 'Твоя доля', 'Черное копье Калисты', 'Глаз герольда', 'Заведенный секундомер', 'Сломанный секундомер', 'Эликсир стали', 'Эликсир волшебства', 'Эликсир гнева'];
	let types = ['Damage', 'AttackSpeed', 'SpellDamage', 'CooldownReduction', 'Health', 'Armor', 'SpellBlock', 'NonbootsMovement', 'OnHit', "ManaRegen", "Active"];

	if (type === 'Boots') types = ['Boots'];
	if (type === 'Consumable') {
		types = ['Consumable', 'Trinket'];
		exceptions.splice(-3);
	}

	const createBlock = () => {
		const content = arrOfItems.map(item => {
			const {name, tags, image, gold} = item;
			const lowerName = name.toLowerCase();
			const lowerValue = inputValue.toLowerCase();
			let show = false;

			if (exceptions.includes(name)) return null;
			if (!tags.some(elem => types.includes(elem))) return null;
			
			if (lowerName.includes(lowerValue)) show = true;
			if (!show) return null;
	
			return (
				<div onClick={() => setCurrentItem(name)} className="item" key={name}>
					<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${image.full}`} alt={name}></img>
					<div className="cost">{gold.total}</div>
				</div>
			)
		});

		return content;
	}

	return(
		<div className="items_block base">
			<div className="title">{title}</div>
			<div className="wrapper_block">
				{createBlock()}
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

export default connect(mapStateToProps)(ItemBlock);