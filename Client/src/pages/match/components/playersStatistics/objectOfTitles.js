const objectOfTitles = () => {
	return {
		fight: ['largestKillingSpree', 'largestMultiKill', 'timeCCingOthers', 'firstBloodKill', 'firstTowerKill'],
		dmg: ["totalDamageDealtToChampions", "physicalDamageDealtToChampions", "magicDamageDealtToChampions", "trueDamageDealtToChampions", "largestCriticalStrike", "damageDealtToBuildings", "damageDealtToObjectives", "totalDamageTaken"],
		healAndShields: ['totalHealsOnTeammates', 'totalDamageShieldedOnTeammates'],
		economics: ['goldEarned', 'totalMinionsKilled', 'neutralMinionsKilled'],
		vision: ['visionScore', 'visionWardsBoughtInGame', 'wardsKilled', 'wardsPlaced'],
		other: ['spell1Casts', 'spell2Casts', 'spell3Casts', 'spell4Casts', 'summoner1Casts', 'summoner2Casts']
	}
}

export default objectOfTitles;