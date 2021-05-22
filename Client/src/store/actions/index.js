const versionLoaded = (version) => {
	return {
		type: 'VERSION_LOADED',
		versionLoaded: version
	};
}

const championsLoaded = (champions) => {
	return {
		type: 'CHAMPIONS_LOADED',
		championsLoaded: champions
	}
}

const runesLoaded = (runes) => {
	return {
		type: 'RUNES_LOADED',
		runesLoaded: runes
	}
}

const spellsLoaded = (spells) => {
	return {
		type: 'SPELLS_LOADED',
		spellsLoaded: spells
	}
}

const itemsLoaded = (items) => {
	return {
		type: 'ITEMS_LOADED',
		itemsLoaded: items
	}
}

const matchTypesLoaded = (matchTypes) => {
	return {
		type: 'MATCH_TYPES_LOADED',
		matchTypeLoaded: matchTypes
	}
}
export {versionLoaded, championsLoaded, runesLoaded, spellsLoaded, itemsLoaded, matchTypesLoaded};