const characteristics = () => {
	return {
		armor: 'Броня', 
		armorperlevel: 'Броня за уровень', 
		attackdamage: 'Сила атаки', 
		attackdamageperlevel: 'Сила атаки за уровень', 
		attackspeed: 'Скорость атаки', 
		attackspeedperlevel: 'Скорость атаки за уровень', 
		crit: 'Шанс крита', 
		critperlevel: 'Шанс крита за уровень', 
		hp: 'Здоровье', 
		hpperlevel: 'Здоровье за уровень', 
		hpregen: 'Восстановление здоровья', 
		hpregenperlevel: 'Восстановление здоровья за уровень', 
		mp: 'Ресурс', 
		mpperlevel: 'Ресурс за уровень', 
		mpregen: 'Восстановление ресурса', 
		mpregenperlevel: 'Восстановление ресурса за уровень', 
		spellblock: 'Сопротивление магии', 
		spellblockperlevel: 'Сопротивление магии за уровень',  
		attackrange: 'Радиус атаки', 
		movespeed: 'Скорость'
	}
}

const champNav = () => {
	return {
		general: 'Общее',
		skills: 'Умения',
		skins: 'Скины',
		builds: 'Билды',
		statistics: 'Статистика'
	}
}

const champStatistics = () => {
	return {
		champ: 'Чемпион', 
		matches: 'Игры', 
		winrate: 'Винрейт', 
		kda: 'KDA', 
		creeps: 'Миньоны', 
		gold: 'Золото', 
		dmg: 'Урон', 
		heal: 'Лечение',
		vision: 'Обзор',
		double: 'Даблкиллы',
		triple: 'Триплкиллы',
		quadro: 'Квадракиллы',
		penta: 'Пентакиллы'
	}
}

const champRates = () => {
	return {
		winrate: 'Винрейт', 
		banrate: 'Банрейт', 
		pickrate: 'Пикрейт'
	}
}

export {characteristics, champNav, champStatistics, champRates};