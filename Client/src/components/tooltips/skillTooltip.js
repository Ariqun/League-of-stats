import checkLanguage from '../../utils/languages/checkLanguage';
import translateInTooltip from '../../utils/languages/translate';

import './tooltips.sass';

const skillTooltip = (skill, version) => {
  if (!skill) return null;

  const {
    name, image, description, cooldownBurn, costBurn,
  } = skill;
  const obj = translateInTooltip(checkLanguage());
  const { cost, cooldown } = obj;

  const tooltip = `
		<div class="tooltip">
			<div class="title">
				<div class="icon">
					<img src="http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${image.full}" alt="${name}_icon"></img>
				</div>
				<div class="settings">
					<span class="name">${name}</span>
					<span class="cost">${cost}: <span class="value">${costBurn}</span></span>
					<span class="cooldown">${cooldown}: <span class="value">${cooldownBurn}</span></span>
				</div>
			</div>

			<div class="descr">${description}</div>
		</div>
	`;

  return tooltip;
};

export default skillTooltip;
