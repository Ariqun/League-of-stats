import React, {useState} from 'react';

import SkillList from './skillList';
import SkillDescr from './skillDescr';

import './index.sass';

const Skills = ({champ}) => {
	const [currentSkill, changeCurrentSkill] = useState('passive');
	const {passive, spells, key} = champ;
	passive.id = 'passive';
	const abilites = [passive, ...spells];

	return(
		<div className="skills">
			<div className="icons col-12">
				<SkillList spells={abilites} changeCurrentSkill={changeCurrentSkill} />
			</div>

			<div className="descr col-xl-7 col-lg-9 col-sm-10">
				<SkillDescr spells={spells} passive={passive} keyID={key} currentSkill={currentSkill} />
			</div>
		</div>
	)
};

export default Skills;