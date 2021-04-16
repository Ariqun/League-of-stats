import React, {Component} from 'react'

export default class ChampGeneral extends Component {
	

	

	render() {
		const {lore, stats} = this.props.info
		console.log(stats)
		// CreateTable(stats)
		return(
			<div className="general">
				<div className="lore">
					<span>{lore}</span>
				</div>

				<div className="stats">
					<CreateTable stats={stats}/>
				</div>
			</div>
		)
	}
}

const CreateTable = ({stats}) => {
	const ruObj = {
		armor: 'Броня', armorperlevel: 'Броня за уровень', attackdamage: 'Сила атаки', attackdamageperlevel: 'Сила атаки за уровень', attackrange: 'Радиус атаки', attackspeed: 'Скорость атаки', attackspeedperlevel: 'Скорость атаки за уровень', crit: 'Шанс крита', critperlevel: 'Шанс крита за уровень', hp: 'Здоровье', hpperlevel: 'Здоровье за уровень', hpregen: 'Восстановление здоровья', hpregenperlevel: 'Восстановление здоровья за уровень', movespeed: 'Скорость', mp: 'Ресурс', mpperlevel: 'Ресурс за уровень', mpregen: 'Восстановление ресурса', mpregenperlevel: 'Восстановление ресурса за уровень', spellblock: 'Сопротивление магии', spellblockperlevel: 'Сопротивление магии за уровень'
	}
	const arr = [];

	for (let key in stats) {
		let ruName = '';
		
		if (ruObj.hasOwnProperty(key)) {
			ruName = ruObj[key]
		}

		arr.push(`${ruName}: ${stats[key]}`)
	}

	const table = arr.map((item, i) => {
		const name = item.split(':')[0]
		const value = item.split(':')[1]

		return(
			<div className="stat" key={i}>
				<span className="stat_name">{name}</span>
				<span className="stat_value">{value}</span>
			</div>
		)
	})

	return(
		table
	)
}