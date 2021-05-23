import './tooltips.sass';

const itemTooltip = (item, version) => {
	const {name, gold, image, description} = item;
	
	let descr = description.replace(/<attention>(\s?\w+%?)<\/attention>|<ornnBonus>(\s?\w+%?)<\/ornnBonus>/gi, (match, m1, m2) => {
		let str = '';
		m1 ? str = m1 : str = m2;

		return `<span>+${str}</span>`;
	})

	descr = descr.replace(/<hr>/gi, '<br>');

	const tooltip = `
		<div class="tooltip">
			<div class="title">
				<div class="icon">
					<img src="http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${image.full}" alt="${name}_icon"></img>
				</div>
				<div class="settings">
					<span class="name">${name}</span>
					<span class="cost">Цена: <span class="value">${gold.total}</span></span>
				</div>
			</div>

			<div class="descr">${descr}</div>
		</div>
	`

	return tooltip;
}

export default itemTooltip;