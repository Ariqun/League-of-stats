import React, {useState, useEffect} from 'react';

import Settings from './settings';
import Statistics from './statistics';
import PlayerItems from '../../../../match/components/getMatchInfo/playerItems';
import PlayersTable from '../../../../match/components/getMatchInfo/playersTable';
import Loading from '../../../../../components/loading';

import RiotAPI from '../../../../../services/riotAPI';

const MatchItem = ({matchId, name}) => {
	const [info, setInfo] = useState({});
	const [isLoading, changeLoading] = useState(true);
	const riotAPI = new RiotAPI();
	
	useEffect(() => {
		const getInfo = async () => {
			const res = await riotAPI.getMatchInfo(matchId);

			setInfo(res);
			changeLoading(false);
		}
		getInfo();
	}, []);

	if (isLoading) return <Loading/>;

	const {participants} = info;
	let player = {};
	
	for (let elem of participants) {
		if (elem.summonerName === name) {
			player = {...elem};
		}
	}

	return(
		<div className="match_item">
			<div className="inner_wrapper">
				<Settings player={player} />
				<Statistics player={player} info={info} matchId={matchId}/>

				<div className="champ_items">
					<PlayerItems player={player}/>
				</div>

				<div className="match_players">
					<PlayersTable currentPlayer={player.summonerName} participants={participants}/>
				</div>
			</div>
		</div>
	)
}

export default MatchItem;