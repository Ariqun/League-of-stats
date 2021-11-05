import React from 'react';

import { SpellTypes } from '../../../../../stores/championStore';
import cl from './SkillList.module.sass';
import SkillItem from './SkillItem';

const SkillList: React.FC<SkillListProps> = ({
  skills, changeCurrentSkill,
}) => (
  <div className={`${cl.skill_list} col-12`}>
    {skills.map((skill) => (
      <SkillItem skill={skill} changeCurrentSkill={changeCurrentSkill} key={skill.id} />
    ))}
  </div>
);

type SkillListProps = {
  skills: SpellTypes[];
  changeCurrentSkill: (id: string) => void;
};

export default SkillList;
