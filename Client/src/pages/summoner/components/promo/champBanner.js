import React from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {findPercent} from '../../../../components/actionsWithNums/findPercent';

const ChampBanner = ({statistics, champions, version}) => {
	const [t] = useTranslation();

	if (!statistics) return content();

	const champs = Object.values(statistics.champions[0]);
	let best = 'Teemo';
	let matches = 0;
	let wins = 0;
	let role = '';
	let matchesAtRole = 0;

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
	const champName = champions[best].name;
	const roles = statistics.champions[0][best].total.roles;

	for (let key in roles) {
		if (roles[key].matches > matchesAtRole) {
			matchesAtRole = roles[key].matches;
			role = key;
		}
	}

	function content (best = 'Teemo', role = 'undefined', champName = '', wins = 0, matches = 0, percent = 0) {
		return(
			<div className="champ_banner" title={t('favoriteChamp')}>
				<div className="icon">
					<div className={matches === 0 ? "cover" : "hidden"}>{t('favoriteChampNotFound')}</div>
					<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${best}.png`} alt={`${best}_icon`}/>
				</div>

				<div className="role">
					<img src={process.env.PUBLIC_URL + `/assets/icons/positions/${role}.png`} alt={`${role}_icon`}/>
				</div>

				<div className="side_block">
					<div className="name">{champName}</div>

					<div className="champ_stats">
						<div className="matches">
							<progress value="0" max="0" />
							<div className={matches === 0 ? "hidden" : "counts"}>
								<div className="total">{t('games')}: <span className="num">{matches}</span></div>
								<div className="wins">{t('wins')}: <span className="num">{wins}</span></div>
							</div>
						</div>

						<div className="winrate">
							<progress value={wins} max={matches} />
							<div className={matches === 0 ? "hidden" : "value"}>{percent}%</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return content(best, role, champName, wins, matches, percent);
}

const mapStateToProps = (state) => {
	return {
		version: state.version,
		champions: state.champions
	};
}

export default connect(mapStateToProps)(ChampBanner);