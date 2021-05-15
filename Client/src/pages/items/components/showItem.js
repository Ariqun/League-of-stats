import React from 'react';
import {connect} from 'react-redux';

import transformAndSort from './transfromAndSort';

const ShowItem = ({name, items, version}) => {
	const arrOfItems = transformAndSort(items);

	const result = arrOfItems.map(item => {
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