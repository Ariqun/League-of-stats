import React, {useState} from 'react';
import {Link} from 'react-router-dom';

function Form() {
	const [name, setName] = useState('');
	const [region, setRegion] = useState('ru')

	const changeName = (e) => {
		setName(e.target.value);
	}

	const changeRegion = (e) => {
		setRegion((e.target.value).toLowerCase());
	}

	const render = () => {
		return(
			<div className="search">
				<form>
					<input type="text" placeholder="Имя призывателя" value={name} onChange={changeName}/>

					<select value={region} onChange={changeRegion}>
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
						<button type="submit">
							<img src={process.env.PUBLIC_URL + "/assets/icons/search.png"} alt="search"/>
						</button>
					</Link>
				</form>
			</div>
		)
	}

	return render();
}

export default Form;