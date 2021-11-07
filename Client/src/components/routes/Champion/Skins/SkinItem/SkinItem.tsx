import React from 'react';

import BlueBorders from '../../../../layouts/BlueBorders';
import { SkinTypes } from '../../../../../stores/championStore';
import cl from './SkinItem.module.sass';

const SkinItem: React.FC<SkinItemProps> = ({ skin, champID, handleOpenModal }) => {
  let { num, name } = skin;
  if (num === 0) name = 'Стандартный';

  return (
    <div
      className={`${cl.skin_card} col-5 col-sm-4 col-md-3`}
      onClick={() => handleOpenModal(champID, num)}
    >
      <BlueBorders>
        <img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champID}_${num}.jpg`} alt={name} />
        <span className={cl.name}>{name}</span>
      </BlueBorders>
    </div>
  );
};

type SkinItemProps = {
  skin: SkinTypes;
  champID: string;
  handleOpenModal: (champID: string, skinID: number) => void;
};

export default SkinItem;
