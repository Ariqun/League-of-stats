import React, { useState } from 'react';

import SelectBlock from '../../inputs/SelectBlock';
import checkLanguage from '../../../../utils/languages/checkLanguage';
import cl from './ChangeLangForm.module.sass';

const ChangeLangForm: React.FC = () => {
  const [lang, setLang] = useState(checkLanguage());

  const changeLang = (e: React.ChangeEvent<HTMLSelectElement>) => setLang(e.target.value);

  const langOptions = [
    { value: 'ru', label: 'RU' },
    { value: 'en', label: 'EN' },
  ];

  const regionSelect = {
    name: 'lang', value: lang, onChange: changeLang, options: langOptions,
  };

  return (
    <form className={cl.change_lang}>
      <SelectBlock select={regionSelect} />
    </form>
  );
};

export default ChangeLangForm;
