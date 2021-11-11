import React from 'react';
import { useTranslation } from 'react-i18next';

import cl from './ShowAllBtn.module.sass';

const ShowAllBtn: React.FC<ShowAllBtnProps> = ({
  isShowAll, handleShowAll, trigger,
}) => {
  const [t] = useTranslation();

  if (isShowAll || trigger === false) return null;

  return (
    <div
      className={cl.btn}
      onClick={handleShowAll}
    >
      {t('showAll')}
    </div>
  );
};

type ShowAllBtnProps = {
  isShowAll: boolean;
  handleShowAll: () => void;
  trigger: boolean;
};

export default ShowAllBtn;
