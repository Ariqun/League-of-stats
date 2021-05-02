const initialState = {
	version: '11.8.1'
}

const reducer = (state = initialState, action) => {
	if (action === 'VersionLoaded') {
		return {version: action.loaded}
	}

	return state;
}

export default reducer;