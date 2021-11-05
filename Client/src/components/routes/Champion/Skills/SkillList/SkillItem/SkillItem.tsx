import React from 'react';

import { SpellTypes } from '../../../../../../stores/championStore';
import BlueBorders from '../../../../../layouts/BlueBorders';
import cl from './SkillItem.module.sass';

const SkillItem: React.FC<SkillItemProps> = ({ skill, changeCurrentSkill }) => {
  const { id, name, image } = skill;
  const className = id === 'passive' ? cl.passive : cl.skill;

  let url = `http://ddragon.leagueoflegends.com/cdn/11.21.1/img/spell/${image.full}`;
  if (id === 'passive') url = `http://ddragon.leagueoflegends.com/cdn/11.21.1/img/passive/${image.full}`;

  return (
    <div onClick={() => changeCurrentSkill(id)} className={className} key={id}>
      <BlueBorders>
        <img src={url} alt={name} />
      </BlueBorders>
    </div>
  );
};

type SkillItemProps = {
  skill: SpellTypes;
  changeCurrentSkill: (id: string) => void;
};

export default SkillItem;
