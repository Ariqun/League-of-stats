import React from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';

import transformAndSort from './transfromAndSort';
import {modifyItemTags} from '../../../components/manipulationsWithStr/modifyTags';

const ShowItem = ({currentItem, items, version}) => {
	const [t] = useTranslation();
	const arrOfItems = transformAndSort(items);

	const result = arrOfItems.map(item => {
		if (item.name !== currentItem) return null;

		const {name, description, image, gold} = item;
		const descr = modifyItemTags(description, 'item');

		return(
			<div className="item_extend_wrapper" key={name}>
				<div className="title">
					<div className="item_icon">
						<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${image.full}`} alt={name}></img>
					</div>
					<div className="name_and_cost">
						<span className="name">{name}</span>
						<span className="cost">{t('cost')}: <span className="value">{gold.total}</span></span>
					</div>
				</div>

				<div className="descr" dangerouslySetInnerHTML={{__html: descr}}></div>
			</div>
		)
	});

	return (
		<div className="item_extend col-5 col-md-4">
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