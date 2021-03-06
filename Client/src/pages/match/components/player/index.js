import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import PlayerRunes from '../playerRunes';
import PlayerSpells from '../playerSpells';
import PlayerRank from '../playerRank';
import PlayerKDA from '../playerKDA';
import PlayerItems from '../playerItems';

import {checkBigNum} from '../../../../components/actionsWithNums/checkNums';
import {findPercent} from '../../../../components/actionsWithNums/findPercent';
import {scorePerMin} from '../../../../components/actionsWithNums/scorePerTime';
import {modifyChampName} from '../../../../components/actionsWithStr/modifyChampName';

import './index.sass';

const Player = ({teamId, info, region, version}) => {
	const {participants, gameDuration} = info;
	const [t] = useTranslation();
	const players = [];

	for (let player of participants) {
		if (player.teamId === teamId) players.push(player);
	}

	const result = players.map((player, i) => {
		const {summonerId, summonerName, championName, summoner1Id, summoner2Id, perks, individualPosition} = player;
		const {kills, deaths, assists, totalMinionsKilled, neutralMinionsKilled, visionScore, goldEarned} = player;

		const champName = modifyChampName(championName);
		const farm = totalMinionsKilled + neutralMinionsKilled;
		const farmPerMin = scorePerMin(farm, gameDuration, 1);
		const gold = checkBigNum(goldEarned);
		const goldPerMin = scorePerMin(goldEarned, gameDuration);
		const visionPerMin = scorePerMin(visionScore, gameDuration, 1);
		const teamKills = players.reduce((acc, el) => {return acc += el.kills}, 0);
		const killPart = findPercent(kills + assists, teamKills);
		
		return(
			<div className={`player ${individualPosition.toLowerCase()}`} key={`${champName}_${i}`}>
				<div className="player_settings">
					<div className="champion_icon">
						<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champName}.png`} alt={`${champName}_icon`}/>
					</div>
					<div className="spells_and_runes">
						<PlayerSpells firstId={summoner1Id} secondId={summoner2Id} />
						<PlayerRunes perks={perks} />
					</div>
				</div>

				<div className="player_name">
					<Link to={`/summoner/${region}/${summonerName}`}>
						<span className="name">{summonerName}</span>
						<PlayerRank id={summonerId} region={region} />
					</Link>
				</div>
				
				<div className="player_stats">
					<PlayerKDA kills={kills} deaths={deaths} assists={assists} />

					<div className="other_score">
						<div className="wrapper_block_left">
							<div className="farm_score">
								<span className="farm">{farm} </span>
								<span className="per_min">({farmPerMin})</span>
								<span> CS</span>
							</div>
							<div className="gold_score">
								<span className="gold">{t('gold')}: {gold}</span>
								<span className="per_min"> ({goldPerMin})</span>
							</div>
						</div>

						<div className="wrapper_block_right">
							<div className="vision_score hidden">
								<span className="vision">{t('vision')}: {visionScore} </span>
								<span className="per_min"> ({visionPerMin})</span>
							</div>

							<span className="kill_part">{killPart}% {t('killsPart')}.</span>
						</div>
					</div>
				</div>

				<PlayerItems player={player} />
			</div>
		)
	})

	return result;
}

const mapStateToProps = (state) => {
	return {version: state.version};
}

export default connect(mapStateToProps)(Player);