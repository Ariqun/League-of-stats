import modifyTags from '../manipulationsWithStr/modifyTags';
import checkLanguage from '../languages/checkLanguage';
import translateInTooltips from '../languages/translate';

import './tooltips.sass';

const runeTooltip = (rune, percent) => {
	const {name, icon, longDesc} = rune;
	const descr = modifyTags(longDesc, 'rune');
	const obj = translateInTooltips(checkLanguage());
	const {pop} = obj;

	let popularity = `<span class="pop">${pop}: <span class="value">${percent}%</span></span>`;
	if (percent === undefined) popularity = '';

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