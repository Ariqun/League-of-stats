import React from 'react';
import {connect} from 'react-redux';

const Banner = ({name, lvl, iconID, version}) => {
	return(
		<div className="banner">
			<div className="icon">
				<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${iconID}.png`} alt="icon"/>
			</div>

			
			<div className="lvl">{lvl}</div>
			<div className="role"><img src="/assets/icons/positions/middle.png" alt="middle_icon"/></div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {version: state.version};
}

export default connect(mapStateToProps)(Banner);