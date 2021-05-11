import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import getMatchInfo from '../../../../match/components/getMatchInfo';
import Loading from '../../../../../components/loading';
import Settings from './settings';
import Statistics from './statistics';

const MatchItem = ({matchId, name, version}) => {
	const [info, setInfo] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const {items, players, championName, spells, mainRunes} = info;
	
	useEffect(() => {
		const getInfo = async () => {
			const mini = true;
			const res = await getMatchInfo(matchId, version, name, mini);
			
			if (res === null) {
				setError(true);
			} else {
				setInfo(info => ({...info, ...res}));
				setLoading(false);
			}
		}
		getInfo();
	}, []);

	if (error) return null;
	if (loading) return <Loading/>;
		
	return(
		<div className="match_item">
			<div className="inner_wrapper">
				<Settings championName={championName} spells={spells} mainRunes={mainRunes}/>
				<Statistics info={info} matchId={matchId}/>

				<div className="champ_items">
					{items}
				</div>

				<div className="match_players">
					{players}
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {version: state.version};
}

export default connect(mapStateToProps)(MatchItem);