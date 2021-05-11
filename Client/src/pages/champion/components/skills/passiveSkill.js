import React from 'react';
import {connect} from 'react-redux';

const PassiveSkill = ({passive, changeCurrentSkill, version}) => {
	return (
		<div className="skill passive" onClick={() => changeCurrentSkill('passive')}>
			<div className="wrapper_for_horizontal_borders">
				<div className="wrapper_for_vertical_borders">
					<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${passive.image.full}`} alt={passive.name}></img>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {version: state.version};
}

export default connect(mapStateToProps)(PassiveSkill);