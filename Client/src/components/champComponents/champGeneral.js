import React, {Component} from 'react'

export default class ChampGeneral extends Component {
	createStatsTable = ({stats}) => {
		const ruObj = {
			armor: 'Броня', armorperlevel: 'Броня за уровень', attackdamage: 'Сила атаки', attackdamageperlevel: 'Сила атаки за уровень', attackspeed: 'Скорость атаки', attackspeedperlevel: 'Скорость атаки за уровень', crit: 'Шанс крита', critperlevel: 'Шанс крита за уровень', hp: 'Здоровье', hpperlevel: 'Здоровье за уровень', hpregen: 'Восстановление здоровья', hpregenperlevel: 'Восстановление здоровья за уровень', mp: 'Ресурс', mpperlevel: 'Ресурс за уровень', mpregen: 'Восстановление ресурса', mpregenperlevel: 'Восстановление ресурса за уровень', spellblock: 'Сопротивление магии', spellblockperlevel: 'Сопротивление магии за уровень',  attackrange: 'Радиус атаки', movespeed: 'Скорость'
		}
		const arr = [];
	
		const sortArr = () => {
			// Такая наркомания нужна для правильного формирования окончательной таблицы
			for (let key in stats) {
				if (ruObj.hasOwnProperty(key) && (key !== 'attackrange' && key !== 'movespeed' && key !== 'attackspeedperlevel')) {
					arr.push(`${ruObj[key]}: ${stats[key]}`)
				}
			}
	
			for (let key in stats) {
				if (ruObj.hasOwnProperty(key) && (key === 'attackspeedperlevel')) {
					arr.push(`${ruObj[key]}: ${stats[key]}`)
				}
			}
	
			for (let key in stats) {
				if (ruObj.hasOwnProperty(key) && (key === 'attackrange' || key === 'movespeed')) {
					arr.push(`${ruObj[key]}: ${stats[key]}`)
				}
			}
		}
		sortArr()
	
		const table = arr.map((item, i) => {
			const name = item.split(':')[0]
			const value = item.split(':')[1]
	
			if (i % 2 === 0) {
				return(
					<div className="stat" key={i}>
						<span className="stat_name">{name} - </span>
						<span className="stat_value">{value}</span>
					</div>
				)
			} else {
				return(
					<div className="stat" key={i}>
						<span className="stat_value">{value}</span>
						<span className="stat_name"> - {name}</span>
					</div>
				)
			}
		})
	
		return(table)
	}

	createRolesBlock = ({roles}) => {
		const result = roles.map(role => {
			return(
				<div className="role" key={role}>
					<img src={`${process.env.PUBLIC_URL}/assets/icons/roles/${role}.png`} alt={`Role_${role}`} title={role}></img>
				</div>
			)
		})

		return(result)
	}

	render() {
		const {name, title, lore, stats, tags} = this.props.champ
		
		return(
			<div className="general">
				<div className="title">
					<span className="champ_name">{name}</span>
					<span className="champ_title">{title}</span>
				</div>

				<div className="lore">
					<p>{lore}</p>
				</div>

				<div className="roles">
					<this.createRolesBlock roles={tags}/>
				</div>

				<div className="stats">
					<this.createStatsTable stats={stats}/>
				</div>
			</div>
		)
	}
}