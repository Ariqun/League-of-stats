import DragonData from "../../../../services/dragonData";

const dragonData = new DragonData();

const getMatchType = async (id) => {
	return await dragonData.getGameType(`http://static.developer.riotgames.com/docs/lol/queues.json`, id);
}

const getSumSpell = async (id, version) => {
	return await dragonData.getSummonerSpell(id);
}

const getAllPlayerSpells = async (player, version) => {
	const {summoner1Id, summoner2Id} = player;
	const res = [await getSumSpell(summoner1Id, version), await getSumSpell(summoner2Id, version)];
	return res;
}

const getRune = async (style, perk, version) => {
	return await dragonData.getRune(`http://ddragon.leagueoflegends.com/cdn/${version}/data/ru_RU/runesReforged.json`, style, perk);
}

const getSubStyle = async (style, version) => {
	return await dragonData.getStyle(`http://ddragon.leagueoflegends.com/cdn/${version}/data/ru_RU/runesReforged.json`, style);
}

const getMainPlayerRunes = async (perks, version) => {
	const primStyle = perks.styles[0].style;
	const primPerk = perks.styles[0].selections[0].perk;
	const subStyle = perks.styles[1].style;
	const res = [];
	
	res.push(await getRune(primStyle, primPerk, version));
	res.push(await getSubStyle(subStyle, version));

	return res;
}

export {getMatchType, getAllPlayerSpells, getMainPlayerRunes};