import React, {useState, useEffect} from 'react';
import ReactTooltip from 'react-tooltip';

import Settings from './settings';
import Statistics from './statistics';
import PlayerItems from '../../../../match/components/getMatchInfo/playerItems';
import PlayersTable from '../../../../match/components/getMatchInfo/playersTable';
import {LoadingBlock} from '../../../../../components/loading';

import DataBase from '../../../../../services/dataBase';

const MatchItem = ({matchId, name}) => {
	const [info, setInfo] = useState({});
	const [isLoading, changeLoading] = useState(true);
	const [isError, changeError] = useState(false);
	const db = new DataBase();
	
	useEffect(() => {
		const getInfo = async () => {
			const res = await db.getMatchInfo(matchId);
			
			if (res === 'Error' || res.queueId === 2000) {
				changeError(true);
			} else {
				setInfo(res);
			}
			
			changeLoading(false);
		}
		getInfo();
	}, []);

	if (isLoading) return <LoadingBlock />
	if (isError) return null;

	const {participants, platformId} = info;
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
					<PlayersTable currentPlayer={player.summonerName} participants={participants} region={platformId}/>
				</div>
			</div>
			
			<ReactTooltip id="tooltip" html/>
		</div>
	)
}

export default MatchItem;