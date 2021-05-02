import React from 'react';

const ShowItem = ({items, name, version}) => {
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
	});

	return (
		<div className="item_extend col-4">
			{result}
		</div>
	);
}

export default ShowItem;