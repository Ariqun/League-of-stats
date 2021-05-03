const playersTable = (currentPlayer, participants, version) => {
	const leftTeam = [];
	const rightTeam = [];

	for (let player of participants) {
		const obj = {
			name: player.summonerName,
			champ: player.championName
		}

		if (player.teamId === 100) {
			leftTeam.push(obj)
		} else if(player.teamId === 200) {
			rightTeam.push(obj);
		}
	}

	const createDOM = (player) => {
		return(
			<div className={currentPlayer === player.name ? 'current_player' : 'player'} key={player.name}>
				<div className="champion_icon">
					<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${player.champ}.png`} alt={`${player.champ}_icon`}/>
				</div>
				<div className="player_name">
					<span>{player.name}</span>
				</div>
			</div>
		)
	}

	return(
		<div className="players_block">
			<div className="left_team">
				{leftTeam.map(player => {return createDOM(player)})}
			</div>
			<div className="right_team">
				{rightTeam.map(player => {return createDOM(player)})}
			</div>
		</div>
	)
}

export default playersTable;