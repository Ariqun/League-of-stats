import React from 'react';

const Types = ({shownTypes, toggleVision}) => {
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
	});

	return (
		<div className="types col-8">
			{types}
		</div>
	);
}

export default Types;