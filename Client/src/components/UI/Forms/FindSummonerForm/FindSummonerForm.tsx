import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SelectBlock from '../../inputs/SelectBlock';
import TextInputBlock, { InputTypes } from '../../inputs/TextInputBlock';
import useInput from '../../../../hooks/useInput';
import checkLanguage from '../../../../utils/languages/checkLanguage';
import pushNameInLS from '../../../../utils/localStorage/pushNameInLS';
import cl from './FindSummonerForm.module.sass';

const FindSummonerForm: React.FC = () => {
  const [region, setRegion] = useState(checkLanguage());
  const [search, setSearch] = useInput('');
  const [t] = useTranslation();

  const changeRegion = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion((e.target.value).toLowerCase());
  };

  const searchField: InputTypes[] = [
    {
      name: 'search', type: 'text', value: search, onChange: setSearch, placeholder: t('sumName'), autoComplete: 'off',
    },
  ];

  const regionOptions = [
    { value: 'ru', label: 'RU' },
    { value: 'euw1', label: 'EUW' },
    { value: 'eun1', label: 'EUN' },
    { value: 'br1', label: 'BR' },
    { value: 'jp1', label: 'JP' },
    { value: 'kr', label: 'KR' },
    { value: 'la1', label: 'LA1' },
    { value: 'la2', label: 'LA2' },
    { value: 'na1', label: 'NA' },
    { value: 'oc1', label: 'OC' },
    { value: 'tr1', label: 'TR' },
  ];

  const regionSelect = {
    name: 'regions', value: region, onChange: changeRegion, options: regionOptions,
  };

  return (
    <form className={cl.form}>
      <TextInputBlock fields={searchField} className={cl.search} />
      <SelectBlock select={regionSelect} className={cl.region_select} />

      <Link to={`/summoner/${region.toLowerCase()}/${search}`} className={cl.submit}>
        <img src={`${process.env.PUBLIC_URL}/assets/icons/search.png`} alt="search" />
      </Link>
    </form>
  );
};

export default FindSummonerForm;
