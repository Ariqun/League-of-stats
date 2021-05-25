module.exports = (res, region) => {
	const obj = {
		name: res.name,
		region: region,
		lvl: res.summonerLevel,
		iconId: res.profileIconId,
		sumId: res.id,
		accId: res.accountId,
		puuId: res.puuid
	};
	
	return obj;
}