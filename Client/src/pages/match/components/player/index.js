import React from 'react';
import {connect} from 'react-redux';

import PlayerRank from '../playerRank';

const Player = ({team, region, version}) => {
	const result = team.players.map((player, i) => {
		const {summonerId, championName, spells, mainRunes, kills, deaths, assists, totalMinionsKilled, farmPerMin, teamKills, visionScore, visionPerMin, goldEarned, goldPerMin, items, summonerName} = player;

		return(
			<div className="player" key={`${championName}_${i}`}>
				<div className="player_settings">
					<div className="champion_icon">
						<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`} alt={`${championName}_icon`}/>
					</div>
					<div className="spells">
						<div className="sum_spells">
							{spells.map(spell => {return(<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell}.png`} alt={`${spell}_icon`} key={spell}/>)})}
						</div>
						<div className="runes">
							{mainRunes.map(rune => {return <img src={`https://ddragon.leagueoflegends.com/cdn/img/${rune}`} alt={`${rune}_icon`} key={rune}/>})}
						</div>
					</div>
				</div>

				<div className="player_name">
					<span className="name">{summonerName}</span>
					<PlayerRank id={summonerId} region={region}/>
				</div>

				<div className="player_stats">
					<div className="kda_score">
						<div className="score_wrapper">
							<span className="kills">{kills}</span>
							<span> / </span>
							<span className="deaths">{deaths}</span>
							<span> / </span>
							<span className="assists">{assists}</span>
						</div>
						<span className="kda_ratio">({((kills + assists) / deaths).toFixed(2)})</span>
					</div>

					<div className="other_score">
						<div className="wrapper_block_left">
							<div className="farm_score">
								<span className="farm">{totalMinionsKilled} </span>
								<span className="per_min">({farmPerMin})</span>
								<span> CS</span>
							</div>
							<div className="gold_score">
								<span className="gold">Золото: {(goldEarned / 1000).toFixed(1)}k </span>
								<span className="per_min">({Math.floor(goldPerMin)})</span>
							</div>
						</div>

						<div className="wrapper_block_right">
							<div className="vision_score">
								<span className="vision">Обзор: {visionScore} </span>
								<span className="per_min">({visionPerMin})</span>
							</div>

							<span className="kill_part">{((kills + assists) * 100 / teamKills).toFixed()}% уч. в уб.</span>
						</div>
					</div>
				</div>

				<div className="player_items">
					{items}
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