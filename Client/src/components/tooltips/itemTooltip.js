import modifyTags from '../manipulationsWithStr/modifyTags';
import './tooltips.sass';

const itemTooltip = (item, version) => {
	const {name, gold, image, description} = item;
	
	const descr = modifyTags(description);

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