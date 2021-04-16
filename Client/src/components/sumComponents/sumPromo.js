import React, {Component} from 'react';

export default class SummonerPromo extends Component {
	render() {
		console.log(this.props)
		const {name, region, lvl, iconID} = this.props.summoner;
		return (
			<div className="promo">
				<div className="banner">
					<div className="icon">
						<img src={`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/profileicon/${iconID}.png`} alt="icon"/>
					</div>
	
					<div className="name_and_lvl">
						<div className="name">{name}
							<span className="region">{region}</span>
						</div>
	
						<div className="lvl">Уровень {lvl}</div>
					</div>
				</div>
			</div>
		)
	}
}