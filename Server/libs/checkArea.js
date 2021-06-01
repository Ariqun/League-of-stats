module.exports =  (region) => {
	str = region.toUpperCase();

	const americas = ['BR', 'LA1', 'LA2', 'NA1'];
	const asia = ['JP1', 'KR', 'OC1'];
	const europe = ['EUN1', 'EUW1', 'TR1', 'RU'];

	if (americas.includes(str)) return 'americas';
	if (asia.includes(str)) return 'asia';
	if (europe.includes(str)) return 'europe';
}