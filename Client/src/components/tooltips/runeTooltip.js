import './tooltips.sass';

const runeTooltip = (rune, percent) => {
	const {name, icon, longDesc} = rune;

	let popularity = `<span class="pop">Популярность: <span class="value">${percent}%</span></span>`;
	if (percent === undefined) popularity = '';

	let descr = longDesc.replace(/<b>(\W+)<\/b>/gi, (match, m1) => {
		return `<span>${m1}</span>`;
	})

	descr = descr.replace(/<attention>(\s?\w+%?)<\/attention>/gi, (match, m1) => {
		return `<span>${m1}</span>`;
	})

	descr = descr.replace(/<hr>/gi, '');

	const tooltip = `
		<div class="tooltip">
			<div class="title">
				<div class="icon">
					<img src="https://ddragon.leagueoflegends.com/cdn/img/${icon}" alt="${name}_icon"></img>
				</div>
				<div class="settings">
					<span class="name">${name}</span>
					${popularity}
				</div>
			</div>

			<div class="descr">${descr}</div>
		</div>
	`

	return tooltip;
}

export default runeTooltip;