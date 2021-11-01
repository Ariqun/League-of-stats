import checkLanguage from '../../utils/languages/checkLanguage';
import translateInTooltip from '../../utils/languages/translate';

import './tooltips.sass';

const spellTooltip = (spell, version) => {
	if (!spell) return null;

	const {name, image, cooldownBurn, description} = spell;
	const obj = translateInTooltip(checkLanguage());
	const {cooldown} = obj;
	
	const tooltip = `
		<div class="tooltip">
			<div class="title">
				<div class="icon">
					<img src="http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${image.full}" alt="${name}_icon"></img>
				</div>
				<div class="settings">
					<span class="name">${name}</span>
					<span class="cooldown">${cooldown}: <span class="value">${cooldownBurn}</span></span>
				</div>
			</div>

			<div class="descr">${description}</div>
		</div>
	`

	return tooltip;
}

export default spellTooltip;