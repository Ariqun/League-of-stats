import React from 'react';
import {Link} from 'react-router-dom';

function Nav() {
	return(
		<div className="nav">
			<ul>
				<li><Link to="/">Чампидроны</Link></li>
				<li><Link to="/items">Предметы</Link></li>
				<li><Link to="/runes">Руны</Link></li>
			</ul>
		</div>
	)
}

export default Nav;