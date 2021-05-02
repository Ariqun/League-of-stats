import React from 'react'

import StatsTable from './statsTable';
import RolesBlock from './rolesBlock';

import './index.sass';

const General = ({champ, id}) => {
	const {name, title, lore, stats, tags} = champ;
	
	return(
		<div className="general">
			<div className="picture_block col-sm-3">
				<img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${id}_0.jpg`} alt={`Art of ${id}`}></img>
			</div>

			<div className="champion_info">
				<div className="title">
					<span className="champ_name">{name}</span>
					<span className="champ_title">{title}</span>
				</div>

				<div className="lore">
					<p>{lore}</p>
				</div>

				<RolesBlock roles={tags}/>
				<StatsTable stats={stats}/>
			</div>
		</div>
	)

}

export default General;