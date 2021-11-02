const initialState = {
  version: '11.10.1',
  champions: {},
  runes: {},
  spells: {},
  items: {},
  matchTypes: {},
};

const reducer = (state = initialState, action) => {
  if (action.type === 'VERSION_LOADED') {
    return {
      ...state,
      version: action.loaded,
      loading: false,
    };
  }

  if (action.type === 'CHAMPIONS_LOADED') {
    return {
      ...state,
      champions: action.loaded,
    };
  }

  if (action.type === 'RUNES_LOADED') {
    return {
      ...state,
      runes: action.loaded,
    };
  }

  if (action.type === 'SPELLS_LOADED') {
    return {
      ...state,
      spells: action.loaded,
    };
  }

  if (action.type === 'ITEMS_LOADED') {
    return {
      ...state,
      items: action.loaded,
    };
  }

  if (action.type === 'MATCH_TYPES_LOADED') {
    return {
      ...state,
      matchTypes: action.loaded,
    };
  }

  return state;
};

export default reducer;
