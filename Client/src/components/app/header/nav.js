import React from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

const Nav = () => {
	const [t] = useTranslation();

	return(
		<div className="nav">
			<ul>
				<li><Link to="/">{t('champs')}</Link></li>
				<li><Link to="/items">{t('items')}</Link></li>
				<li><Link to="/runes">{t('runes')}</Link></li>
			</ul>
		</div>
	)
}

export default Nav;