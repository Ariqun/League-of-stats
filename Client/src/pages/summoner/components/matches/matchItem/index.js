import React, {useState, useEffect} from 'react';
import ReactTooltip from 'react-tooltip';

import Settings from './settings';
import Statistics from './statistics';
import PlayerItems from '../../../../match/components/playerItems';
import PlayersTable from '../../../../match/components/playersTable';
import {LoadingBlock} from '../../../../../components/loading';

import DataBase from '../../../../../services/dataBase';

const MatchItem = ({matchId, name, region}) => {
	const [info, setInfo] = useState({});
	const [isLoading, changeLoading] = useState(true);
	const [isError, changeError] = useState(false);
	const db = new DataBase();
	
	useEffect(() => {
		const getInfo = async () => {
			const res = await db.getMatchInfo(matchId, region);
			const {queueId} = res;

			if (res === 'Error' || queueId === 2000 || queueId === 2020 || queueId === 2010) {
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

				<PlayerItems player={player}/>

				<div className="match_players">
					<PlayersTable currentPlayer={player.summonerName} participants={participants} region={platformId}/>
				</div>
			</div>
			
			<ReactTooltip id="tooltip" html/>
		</div>
	)
}

export default MatchItem;