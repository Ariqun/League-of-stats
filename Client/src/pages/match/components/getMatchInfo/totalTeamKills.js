const totalTeamKills = (teams, id) => {
	for (let elem of teams) {
		if (elem.teamId === id) {
			return elem.objectives.champion.kills;
		}
	}
}

export default totalTeamKills;