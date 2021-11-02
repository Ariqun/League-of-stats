const versionLoaded = (version) => ({
  type: 'VERSION_LOADED',
  versionLoaded: version,
});

const championsLoaded = (champions) => ({
  type: 'CHAMPIONS_LOADED',
  championsLoaded: champions,
});

const runesLoaded = (runes) => ({
  type: 'RUNES_LOADED',
  runesLoaded: runes,
});

const spellsLoaded = (spells) => ({
  type: 'SPELLS_LOADED',
  spellsLoaded: spells,
});

const itemsLoaded = (items) => ({
  type: 'ITEMS_LOADED',
  itemsLoaded: items,
});

const matchTypesLoaded = (matchTypes) => ({
  type: 'MATCH_TYPES_LOADED',
  matchTypeLoaded: matchTypes,
});
export {
  versionLoaded, championsLoaded, runesLoaded, spellsLoaded, itemsLoaded, matchTypesLoaded,
};
