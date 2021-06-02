module.exports = (res, region) => {
	const obj = {
		name: res.name,
		region: region,
		lvl: res.summonerLevel,
		iconId: res.profileIconId,
		sumId: res.id,
		accId: res.accountId,
		puuid: res.puuid
	};
	
	return obj;
}