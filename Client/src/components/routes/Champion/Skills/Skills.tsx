import React, { useState } from 'react';

import SkillDescr from './SkillDescr';
import SkillList from './SkillList';
import championStore from '../../../../stores/championStore';
import cl from './Skills.module.sass';

const Skills: React.FC = () => {
  const [currentSkill, changeCurrentSkill] = useState('passive');

  const {
    champion: { passive, spells, key },
  } = championStore;

  passive.id = 'passive';
  const abilites = [passive, ...spells];

  return (
    <div className={cl.skills}>
      <SkillList
        skills={abilites}
        changeCurrentSkill={changeCurrentSkill}
      />

      <SkillDescr
        skills={abilites}
        keyID={key}
        currentSkill={currentSkill}
      />
    </div>
  );
};

export default Skills;
