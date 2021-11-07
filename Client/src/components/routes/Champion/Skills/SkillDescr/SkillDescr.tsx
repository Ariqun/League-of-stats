import React from 'react';
import { useTranslation } from 'react-i18next';

import BlueBorders from '../../../../layouts/BlueBorders';
import { SpellTypes } from '../../../../../stores/championStore';
import addFourZeros from '../../../../../utils/actionsWithNums/addFourZeros';
import removeTags from '../../../../../utils/actionsWithStr/removeTags';
import cl from './SkillDescr.module.sass';

const SkillDescr: React.FC<SkillDescrProps> = ({
  skills, keyID, currentSkill,
}) => {
  const [t] = useTranslation();

  const skill = skills.filter((skill) => skill.id === currentSkill)[0];
  const { id, name, description } = skill;
  const url = getUrl(skills, currentSkill, keyID);
  const descr = removeTags(description);

  return (
    <div className={`${cl.descr} col-xl-7 col-lg-9 col-sm-10`} key={currentSkill}>
      <div className={cl.text}>
        <span className={cl.name}>
          {name}

          <span className={id === 'passive' ? cl.note : cl.hidden}>
            [{t('passive')}]
          </span>
        </span>

        <span className={cl.descr}>
          {descr}
        </span>
      </div>

      <div className={cl.video}>
        <BlueBorders type="video">
          <video src={url} preload="auto" autoPlay loop muted />
        </BlueBorders>
      </div>
    </div>
  );
};

const getUrl = (skills: SpellTypes[], currentSkill: string, keyID: string): string => {
  const key = addFourZeros(keyID);

  if (currentSkill === 'passive') {
    return `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${key}/ability_${key}_P1.webm`;
  }
  const index = skills.findIndex((skill) => skill.id === currentSkill);
  const btns: BtnTypes = {
    1: 'Q', 2: 'W', 3: 'E', 4: 'R',
  };

  return `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${key}/ability_${key}_${btns[index]}1.webm`;
};

type BtnTypes = {
  [key: number]: string;
};

type SkillDescrProps = {
  skills: SpellTypes[];
  keyID: string;
  currentSkill: string;
};

export default SkillDescr;
