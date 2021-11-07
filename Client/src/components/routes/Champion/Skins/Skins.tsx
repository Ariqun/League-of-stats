import React, { useState } from 'react';

import championStore from '../../../../stores/championStore';
import ImgModalLayout from '../../../ui/modals/ImgModalLayout';
import SkinItem from './SkinItem';
import cl from './Skins.module.sass';

const Skins: React.FC = () => {
  const [modalInfo, setModalInfo] = useState({
    isVisible: false, champID: '', skinID: -1,
  });
  const { champion: { id, skins } } = championStore;

  const handleOpenModal = (champID: string, skinID: number) => {
    setModalInfo({ isVisible: true, champID, skinID });
  };

  const handleCloseModal = () => {
    setModalInfo({ isVisible: false, champID: '', skinID: -1 });
  };

  return (
    <>
      <div className={cl.skins}>
        {skins.map((skin) => (
          <SkinItem
            skin={skin}
            champID={id}
            handleOpenModal={handleOpenModal}
            key={skin.id}
          />
        ))}
      </div>

      <ImgModalLayout
        isVisible={modalInfo.isVisible}
        handleClose={handleCloseModal}
      >
        <img
          src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${modalInfo.champID}_${modalInfo.skinID}.jpg`}
          alt={`${modalInfo.champID}_${modalInfo.skinID}`}
        />
      </ImgModalLayout>
    </>
  );
};

export default Skins;
