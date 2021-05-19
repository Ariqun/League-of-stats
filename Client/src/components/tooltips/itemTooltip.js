import './tooltips.sass';

const itemTooltip = (item, version) => {
	const {name, gold, image, description} = item;

	let descr = description.replace(/<attention>(\s?\w+%?)<\/attention>/gi, (match, m1) => {
		return `<span>+${m1}</span>`;
	})

	descr = descr.replace(/<hr>/gi, '<br>');

	const tooltip = `
		<div class="tooltip">
			<div class="title">
				<div class="icon">
					<img src="http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${image.full}" alt="${name}_icon"></img>
				</div>
				<div class="name_and_cost">
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