import React from 'react';
import {Link} from 'react-router-dom';

function Nav() {
	return(
		<div className="nav col-4">
			<ul>
				<li className="col"><Link to="/">Чампидроны</Link></li>
				<li className="col"><Link to="/items">Предметы</Link></li>
				<li className="col">Статистика</li>
			</ul>
		</div>
	)
}

export default Nav;