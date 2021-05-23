const fight = () => {
	return {
		largestKillingSpree: 'Лучшая череда убийств',
		largestMultiKill: 'Максимальное множественной убийство',
		timeCCingOthers: 'Показатель контроля',
		firstBloodKill: 'Первая кровь',
		firstTowerKill: 'Первая башня'
	}
}

const damage = () => {
	return {
		totalDamageDealtToChampions: 'Общий урон по чемпионам',
		physicalDamageDealtToChampions: 'Физический урон по чемпионам',
		magicDamageDealtToChampions: 'Магический урон по чемпионам',
		trueDamageDealtToChampions: 'Чистый урон по чемпионам',
		largestCriticalStrike: 'Максимальный крит',
		damageDealtToBuildings: 'Урон по башням',
		damageDealtToObjectives: 'Урон по объектам',
		totalDamageTaken: 'Получено урона'
	}
}

const restore = () => {
	return {
		totalHealsOnTeammates: 'Лечение союзников',
		totalDamageShieldedOnTeammates: 'Щиты на союзниках'
	}
}

const eco = () => {
	return {
		goldEarned: 'Золота полученно',
		totalMinionsKilled: 'Убито миньонов',
		neutralMinionsKilled: 'Убито нейтральных монстров'
	}
}

const vision = () => {
	return {
		visionScore: 'Очки обзора',
		visionWardsBoughtInGame: 'Куплено тотемов контроля',
		wardsKilled: 'Уничтоженно тотемов',
		wardsPlaced: 'Установленно тотемов'
	}
}

const other = () => {
	return {
		spell1Casts: 'Использований Q',
		spell2Casts: 'Использований W',
		spell3Casts: 'Использований E',
		spell4Casts: 'Использований R',
		summoner1Casts: 'Использований D',
		summoner2Casts: 'Использований F'
	}
}

export {fight, damage, restore, eco, vision, other};