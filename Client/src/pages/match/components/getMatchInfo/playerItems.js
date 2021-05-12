import React from 'react';
import {connect} from 'react-redux';

const PlayerItems = ({player, version}) => {
	let items = [];
	
	for(let key in player) {
		if (key.match(/item[\d]/)) {
			items.push(player[key]);
		}
	}
	
	return(
		<div className="items_block">
			{items.map((item, i) => {
				if (item === 0) return <div className="item" key={`${item}_${i}`}/>;

				return(
					<div className="item" key={`${item}_${i}`}>
						<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item}.png`} alt={`${item}_icon`}/>
					</div>
				);
			})}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {version: state.version}
}

export default connect(mapStateToProps)(PlayerItems);