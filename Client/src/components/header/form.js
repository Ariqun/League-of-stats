import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import Search from '../inputs/search';
import checkLanguage from '../languages/checkLanguage';
import useInput from '../../hooks/useInput';
import pushNameInLS from '../localStorage/pushNameInLS';

const Form = () => {
	const [region, setRegion] = useState(checkLanguage());
	const [inputValue, setInputValue] = useInput('');
	const [t] = useTranslation();

	const changeRegion = (e) => setRegion((e.target.value).toLowerCase());

	return(
		<div className="search">
			<form>
				<div className="search_input">
					<Search func={setInputValue} placeholder={t('sumName')} recent/>
				</div>

				<select value={region} onChange={changeRegion} className="select">
					<option value="ru">RU</option>
					<option value="euw1">EUW</option>
					<option value="eun1">EUN</option>
					<option value="br1">BR</option>
					<option value="jp1">JP</option>
					<option value="kr">KR</option>
					<option value="la1">LA1</option>
					<option value="la2">LA2</option>
					<option value="na1">NA</option>
					<option value="oc1">OC</option>
					<option value="tr1">TR</option>
				</select>

				<Link to={`/summoner/${region.toLowerCase()}/${inputValue}`}>
					<button onClick={() => pushNameInLS(inputValue, region)} type="submit">
						<img src={process.env.PUBLIC_URL + "/assets/icons/search.png"} alt="search"/>
					</button>
				</Link>
			</form>
		</div>
	)
}

export default Form;