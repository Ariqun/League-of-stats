import React from 'react';
import {connect} from 'react-redux';
import { findPercent } from '../../../../components/manipulationsWithNums/findPercent';

const ChampBanner = ({statistics, champions, version}) => {
	const champs = Object.values(statistics.champions[0]);
	let best = 'Teemo';
	let matches = 0;
	let wins = 0;

	for (let champ of champs) {
		const champMatches = champ.total.results.matches;
		const champWins = champ.total.results.wins;

		if (champMatches > matches) {
			matches = champMatches;
			wins = champWins;
			best = champ.name;
		}
	}

	const percent = findPercent(wins, matches, 1);
	const name = champions[best].name;

	return(
		<div className="champ_banner">
			<div className="icon">
				<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${best}.png`} alt={`${best}_icon`}/>
			</div>

			<div className="role"><img src="/assets/icons/positions/middle.png" alt="middle_icon"/></div>

			<div className="side_block">
				<div className="name">{name}</div>

				<div className="champ_stats">
					<div className="winrate">
						<progress value={wins} max={matches} />
						<div className="value">{percent}%</div>
					</div>

					<div className="matches">
						<progress value={wins} max={matches} />
						<div className="counts">
							<div className="looses">{matches - wins}</div>
							<div className="wins">{wins}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		version: state.version,
		champions: state.champions
	};
}

export default connect(mapStateToProps)(ChampBanner);