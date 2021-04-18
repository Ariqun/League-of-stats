import React, {Component} from 'react';

export default class SummonerNav extends Component {

	render() {
		const ruArr = ['Игры', 'Чемпионы', 'Рекорды', 'Статистика']
		const engArr = ['matches','champs', 'records', 'stat']
		const list = ruArr.map((item, i) => {
			const id = engArr[i]
			
			return(
				<li onClick={() => this.props.changeTab(id)} key={id}><span>{item}</span></li>
			)
		})

		return(
			<ul className='sum_nav'>
				{list}
			</ul>
		)
	}
}