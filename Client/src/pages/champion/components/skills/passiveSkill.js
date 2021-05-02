import React from 'react';

const PassiveSkill = ({passive, version, changeCurrentSkill}) => {
	return (
		<div className="skill passive" onClick={() => changeCurrentSkill('passive')}>
			<div className="wrapper_for_horizontal_borders">
				<div className="wrapper_for_vertical_borders">
					<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${passive.image.full}`} alt={passive.name}></img>
				</div>
			</div>
		</div>
	)
}

export default PassiveSkill;