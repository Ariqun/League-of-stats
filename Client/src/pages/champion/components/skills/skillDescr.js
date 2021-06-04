import React from 'react';
import {useTranslation} from 'react-i18next';

import removeTags from '../../../../components/manipulationsWithStr/removeTags';
import {addZeroFour} from '../../../../components/manipulationsWithNums/addZeros';

const SkillDescr = ({spells, passive, keyID, currentSkill}) => {
	const [t] = useTranslation();
	let key = addZeroFour(keyID);

	const content = (name, description, url, passive = false) => {
		const descr = removeTags(description);

		return (
			<React.Fragment key={key}>
				<div className="text">
					<span className="skill_name">{name}
						<span className={passive ? "skill_btn" : "hidden"}>[{t("passive")}]</span>
					</span>
					<span className="skill_descr">{descr}</span>
				</div>

				<div className="video">
					<div className="wrapper_for_horizontal_borders">
						<div className="wrapper_for_vertical_borders">
							<video src={url} preload="auto" autoPlay loop muted="muted"></video>
						</div>
					</div>
				</div>
			</React.Fragment>
		)
	}

	if (currentSkill === 'passive') {
		const {name, description} = passive;
		const url = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${key}/ability_${key}_P1.webm`;

		return content(name, description, url, true);
	}

	const result = spells.map((spell, i) => {
		if (spell.id !== currentSkill) return null;

		const btns = {0: 'Q', 1: 'W', 2: 'E', 3: 'R'};
		const {name, description} = spell;
		const url = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${key}/ability_${key}_${btns[i]}1.webm`;

		return content(name, description, url);
	})

	return result;
}

export default SkillDescr;