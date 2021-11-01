import checkLanguage from '../../utils/languages/checkLanguage';
import translateInTooltips from '../../utils/languages/translate';
import {modifyRuneTags} from '../../utils/actionsWithStr/modifyTags';

import './tooltips.sass';

const runeTooltip = (rune, percent) => {
	if (!rune) return null;

	const {name, icon, longDesc} = rune;
	const descr = modifyRuneTags(longDesc, 'rune');
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