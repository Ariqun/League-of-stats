import React from 'react';

import {addZeroFour} from '../../../../components/manipulationsWithNums/addZeros';
import removeTags from '../../../../components/manipulationsWithStr/removeTags';

const SkillDescr = ({spells, passive, keyID, currentSkill}) => {
	let key = addZeroFour(keyID);

	if (currentSkill === 'passive') {
		const descr = removeTags(passive.description);

		return(
			<React.Fragment key={key}>
				<div className="text">
					<span className="skill_name">{passive.name}<span className="skill_btn">[пассивное]</span></span>
					<span className="skill_descr">{descr}</span>
				</div>

				<div className="video">
					<div className="wrapper_for_horizontal_borders">
						<div className="wrapper_for_vertical_borders">
							<video src={`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${key}/ability_${key}_P1.webm`} preload="auto" autoPlay loop muted="muted"></video>
						</div>
					</div>
				</div>
			</React.Fragment>
		)
	}

	const content = spells.map((spell, i) => {
		if (spell.id !== currentSkill) {
			return null;
		}

		const btns = {0: 'Q', 1: 'W', 2: 'E', 3: 'R'};
		const {name, description} = spell;
		const descr = removeTags(description);
		console.log(spell);
		return(
			<React.Fragment key={key}>
				<div className="text">
					<span className="skill_name">{name}<span className="skill_btn">[{btns[i]}]</span></span>
					<span className="skill_descr">{descr}</span>
				</div>

				<div className="video">
					<div className="wrapper_for_horizontal_borders">
						<div className="wrapper_for_vertical_borders">
							<video src={`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${key}/ability_${key}_${btns[i]}1.webm`} preload="auto" autoPlay loop muted="muted"></video>
						</div>
					</div>
				</div>
			</React.Fragment>
		)
	})

	return(content);
}

export default SkillDescr;