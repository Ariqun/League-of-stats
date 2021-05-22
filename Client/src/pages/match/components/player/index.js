import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import PlayerRunes from '../getMatchInfo/playerRunes';
import PlayerSpells from '../getMatchInfo/playerSpells';
import PlayerRank from '../playerRank';
import PlayerKDA from '../getMatchInfo/playerKDA';
import PlayerItems from '../getMatchInfo/playerItems';

import {checkBigNum} from '../../../../components/manipulationsWithNums/checkNums';
import {findPercent} from '../../../../components/manipulationsWithNums/findPercent';
import {scorePerMin} from '../../../../components/manipulationsWithNums/scorePerTime';
import {modifyChampName} from '../../../../components/manipulationsWithStr/modifyChampName';

const Player = ({teamId, info, region, version}) => {
	const {participants, gameDuration} = info;
	const players = [];

	for (let player of participants) {
		if (player.teamId === teamId) players.push(player);
	}

	const result = players.map((player, i) => {
		const {summonerId, championName, kills, deaths, assists, totalMinionsKilled, neutralMinionsKilled, visionScore, goldEarned, summonerName, summoner1Id, summoner2Id, perks} = player;
		
		const champName = modifyChampName(championName);
		const farm = totalMinionsKilled + neutralMinionsKilled;
		const farmPerMin = scorePerMin(farm, gameDuration, 1);
		const gold = checkBigNum(goldEarned);
		const goldPerMin = scorePerMin(goldEarned, gameDuration);
		const visionPerMin = scorePerMin(visionScore, gameDuration, 1);
		const teamKills = players.reduce((acc, el) => {return acc += el.kills}, 0);
		const killPart = findPercent(kills + assists, teamKills);
		
		return(
			<div className="player" key={`${champName}_${i}`}>
				<div className="player_settings">
					<div className="champion_icon">
						<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champName}.png`} alt={`${champName}_icon`}/>
					</div>
					<div className="spells_and_runes">
						<PlayerSpells firstId={summoner1Id} secondId={summoner2Id}/>
						<PlayerRunes perks={perks}/>
					</div>
				</div>

				<div className="player_name">
					<Link to={`/summoner/${region}/${summonerName}`}>
						<span className="name">{summonerName}</span>
						<PlayerRank id={summonerId} region={region}/>
					</Link>
				</div>
				
				<div className="player_stats">
					<PlayerKDA kills={kills} deaths={deaths} assists={assists}/>

					<div className="other_score">
						<div className="wrapper_block_left">
							<div className="farm_score">
								<span className="farm">{farm} </span>
								<span className="per_min">({farmPerMin})</span>
								<span> CS</span>
							</div>
							<div className="gold_score">
								<span className="gold">Золото: {gold}</span>
								<span className="per_min"> ({goldPerMin})</span>
							</div>
						</div>

						<div className="wrapper_block_right">
							<div className="vision_score">
								<span className="vision">Обзор: {visionScore} </span>
								<span className="per_min"> ({visionPerMin})</span>
							</div>

							<span className="kill_part">{killPart}% уч. в уб.</span>
						</div>
					</div>
				</div>

				<div className="player_items">
					<PlayerItems player={player}/>
				</div>
			</div>
		)
	})

	return result;
}

const mapStateToProps = (state) => {
	return {version: state.version};
}

export default connect(mapStateToProps)(Player);