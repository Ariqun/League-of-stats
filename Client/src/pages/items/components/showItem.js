import React from 'react';
import {connect} from 'react-redux';

import transformAndSort from './transfromAndSort';

const ShowItem = ({currentItem, items, version}) => {
	const arrOfItems = transformAndSort(items);

	const result = arrOfItems.map(item => {
		if (item.name !== currentItem) return null;

		const {name, description, image, gold} = item;

		let descr = description.replace(/<attention>(\s?\w+%?)<\/attention>|<ornnBonus>(\s?\w+%?)<\/ornnBonus>/gi, (match, m1, m2) => {
			let str = '';
			m1 ? str = m1 : str = m2;
	
			return `<span>+${str}</span>`;
		})

		descr = descr.replace(/<hr>/gi, '<br>');

		return(
			<div className="item_extend_wrapper" key={name}>
				<div className="title">
					<div className="item_icon">
						<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${image.full}`} alt={name}></img>
					</div>
					<div className="name_and_cost">
						<span className="name">{name}</span>
						<span className="cost">Цена: <span className="value">{gold.total}</span></span>
					</div>
				</div>

				<div className="descr" dangerouslySetInnerHTML={{__html: descr}}></div>
			</div>
		)
	});

	return (
		<div className="item_extend col-4">
			{result}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		version: state.version,
		items: state.items
	};
}

export default connect(mapStateToProps)(ShowItem);