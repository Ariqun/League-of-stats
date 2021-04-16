import React, {Component} from 'react';

export default class ChampNav extends Component {
	render() {
		return(
			<ul className='champion_nav'>
				<li className="active"><span>Общее</span></li>
				<li><span>Умения</span></li>
				<li><span>Билды</span></li>
				<li><span>Статистика</span></li>
				<li><span>Скины</span></li>
			</ul>
		)
	}
}