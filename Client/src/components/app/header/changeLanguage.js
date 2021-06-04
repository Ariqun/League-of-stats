import React from 'react';

const ChangeLanguage = ({changeLang}) => {
	return(
		<div className="choise_lang">
			<form>
				<select onChange={changeLang}>
					<option value="ru">RU</option>
					<option value="en">EN</option>
				</select>
			</form>
		</div>
	)
}

export default ChangeLanguage;