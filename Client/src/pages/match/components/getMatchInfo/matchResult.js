const matchResult = (teams, id) => {
	for (let team of teams) {
		if (team.teamId === id) {
			return(<span className={team.win ? 'win' : 'defeat'}>{team.win ? 'Победа' : 'Поражение'}</span>);
		}
	}
}

export default matchResult;