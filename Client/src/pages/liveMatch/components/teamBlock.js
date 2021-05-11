import React from 'react';
import {connect} from 'react-redux';

import Card from './card';

const TeamBlock = ({team, type}) => {
	const result = team.map(player => {
		return <Card player={player}/>
	})

	return (
		<div className={`team ${type}`}>
			{result}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		version: state.version,
		champions: state.champions
	}
}

export default connect(mapStateToProps)(TeamBlock);