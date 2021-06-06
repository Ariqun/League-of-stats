import modifyTags from '../manipulationsWithStr/modifyTags';
import checkLanguage from '../languages/checkLanguage';
import translateInTooltips from '../languages/translate';

import './tooltips.sass';

const itemTooltip = (item, version) => {
	const {name, gold, image, description} = item;
	const descr = modifyTags(description, 'item');
	const obj = translateInTooltips(checkLanguage());

	const {price} = obj;

	const tooltip = `
		<div class="tooltip">
			<div class="title">
				<div class="icon">
					<img src="http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${image.full}" alt="${name}_icon"></img>
				</div>
				<div class="settings">
					<span class="name">${name}</span>
					<span class="cost">${price}: <span class="value">${gold.total}</span></span>
				</div>
			</div>

			<div class="descr">${descr}</div>
		</div>
	`

	return tooltip;
}

export default itemTooltip;