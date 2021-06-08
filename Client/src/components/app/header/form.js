import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import checkLanguage from '../../languages/checkLanguage';
import Search from '../inputs/search';

const Form = () => {
	const [name, setName] = useState('');
	const [region, setRegion] = useState(checkLanguage());
	const [t] = useTranslation();

	let recentSearch = [];

	const changeName = (e) => {
		setName(e.target.value);
	}

	const changeRegion = (e) => {
		setRegion((e.target.value).toLowerCase());
	}

	const pushNameInLS = () => {
		const recentSummoners = JSON.parse(localStorage.getItem('recent summoners'));
		recentSearch = [{name: name, region: region}];

		if (name === '') return;
		if (recentSummoners) recentSearch = [...recentSummoners];
		if (recentSummoners && !recentSummoners.find(sum => sum.name === name && sum.region === region)) {
			recentSearch = [...recentSummoners, {name: name, region: region}];
		}

		localStorage.setItem('recent summoners', JSON.stringify(recentSearch));
	}

	return(
		<div className="search">
			<form>
				<div className="search_input">
					<Search func={changeName} placeholder={t('sumName')} recent/>
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

				<Link to={`/summoner/${region.toLowerCase()}/${name}`}>
					<button onClick={() => pushNameInLS()} type="submit">
						<img src={process.env.PUBLIC_URL + "/assets/icons/search.png"} alt="search"/>
					</button>
				</Link>
			</form>
		</div>
	)
}

export default Form;