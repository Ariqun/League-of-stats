import React from 'react';

import checkLanguage from '../languages/checkLanguage';

const ChangeLanguage = ({changeLang}) => {
	const lang = checkLanguage();

	return(
		<div className="choise_lang">
			<form>
				<select value={lang} onChange={changeLang}>
					<option value="ru">RU</option>
					<option value="en">EN</option>
				</select>
			</form>
		</div>
	)
}

export default ChangeLanguage;