import React, {useState} from 'react';

import PassiveSkill from './passiveSkill';
import SkillList from './skillList';
import SkillDescr from './skillDescr';

import './index.sass';

const Skills = ({champ, version}) => {
	const [currentSkill, changeCurrentSkill] = useState('passive');
	const {passive, spells, key} = champ;
	
	return(
		<div className="skills">
			<div className="icons col-12">
				<PassiveSkill passive={passive} version={version} changeCurrentSkill={changeCurrentSkill} />
				<SkillList spells={spells} version={version} changeCurrentSkill={changeCurrentSkill}/>
			</div>

			<div className="descr col-xl-7 col-lg-9 col-sm-10">
				<SkillDescr spells={spells} passive={passive} keyID={key} currentSkill={currentSkill}/>
			</div>
		</div>
	)
}

export default Skills;