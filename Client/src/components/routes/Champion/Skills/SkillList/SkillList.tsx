import React from 'react';

import SkillItem from './SkillItem';
import { SpellTypes } from '../../../../../stores/championStore';
import cl from './SkillList.module.sass';

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