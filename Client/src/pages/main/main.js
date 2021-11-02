import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ChampionBlock from './components/championBlock';
import Roles from './components/roles';
import Search from '../../components/ui/inputs/search';
import useInput from '../../hooks/useInput';

const Main = () => {
  const [shownRoles, changeShownRoles] = useState(['Assassin', 'Fighter', 'Mage', 'Marksman', 'Support', 'Tank']);
  const [inputValue, setInputValue] = useInput('');
  const [t] = useTranslation();

  const toggleVision = (role) => {
    if (shownRoles.includes(role)) {
      const arr = shownRoles.filter((item) => item !== role);
      changeShownRoles([...arr]);
    } else {
      changeShownRoles([...shownRoles, role]);
    }
  };

  return (
    <div className="main_page">
      <div className="container-xxl">
        <Roles shownRoles={shownRoles} toggleVision={toggleVision} />

        <div className="choice_champ col-12">
          <Search func={setInputValue} placeholder={t('startWriteChampName')} />
        </div>

        <ChampionBlock inputValue={inputValue} shownRoles={shownRoles} />
      </div>
    </div>
  );
};

export default Main;
