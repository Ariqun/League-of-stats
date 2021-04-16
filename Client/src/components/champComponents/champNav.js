import React, {Component} from 'react';

export default class ChampNav extends Component {
	render() {
		const ruArr = ['Общее', 'Умения', 'Билды', 'Статистика', 'Скины']
		const engArr = ['general', 'skills', 'builds', 'stat', 'skins']
		const list = ruArr.map((item, i) => {
			const id = engArr[i]
			
			return(
				<li onClick={() => this.props.changeTab(id)} key={id}><span>{item}</span></li>
			)
		})

		return(
			<ul className='champion_nav'>
				{list}
			</ul>
		)
	}
}