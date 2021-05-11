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

const liveLoaded = (live) => {
	return {
		type: 'LIVE_LOADED',
		liveLoaded: live
	}
}
export {versionLoaded, championsLoaded, liveLoaded};