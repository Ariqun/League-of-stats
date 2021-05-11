import React from 'react';
import {connect} from 'react-redux';

const ItemBlock = ({items, setCurrentItem, tag, title, version}) => {
	const createBlock = () => {
		const exceptions = ['Чучело', 'Твоя доля', 'Черное копье Калисты', 'Глаз герольда', 'Заведенный секундомер', 'Сломанный секундомер', 'Эликсир стали', 'Эликсир волшебства', 'Эликсир гнева'];

		const content = items.map(item => {
			if (exceptions.includes(item.name)) return null;
			if (tag && !item.tags.some(elem => tag.includes(elem))) return null;
	
			return (
				<div onClick={() => setCurrentItem(item.name)} className="item" key={item.image.full}>
					<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`} alt={item.name}></img>
					<div className="cost">{item.gold.total}</div>
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
	return {version: state.version};
}

export default connect(mapStateToProps)(ItemBlock);