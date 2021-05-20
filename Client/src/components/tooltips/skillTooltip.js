import './tooltips.sass';

const skillTooltip = (skill, version) => {
	const {name, image, description, cooldownBurn, costBurn} = skill;

	const tooltip = `
		<div class="tooltip">
			<div class="title">
				<div class="icon">
					<img src="http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${image.full}" alt="${name}_icon"></img>
				</div>
				<div class="settings">
					<span class="name">${name}</span>
					<span class="cost">Стоимость: <span class="value">${costBurn}</span></span>
					<span class="cooldown">Восстановление: <span class="value">${cooldownBurn}</span></span>
				</div>
			</div>

			<div class="descr">${description}</div>
		</div>
	`

	return tooltip;
}

export default skillTooltip;