const initialState = {
	version: '11.9.1',
	champions: {},
	live: {}
}

const reducer = (state = initialState, action) => {
	if (action.type === 'VERSION_LOADED') {
		return {
			...state,
			version: action.loaded,
			loading: false
		}
	}

	if (action.type === 'CHAMPIONS_LOADED') {
		return {
			...state,
			champions: action.loaded
		}
	}

	if (action.type === 'LIVE_LOADED') {
		return {
			...state,
			live: action.loaded
		}
	}
	
	return state;
}

export default reducer;