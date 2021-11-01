const pushNameInLS = (name, region) => {
	let recentSearch = [];

	const recentSummoners = JSON.parse(localStorage.getItem('recent summoners'));
	recentSearch = [{name: name, region: region}];

	if (name === '') return;

	if (recentSummoners) recentSearch = [...recentSummoners];
	
	if (recentSummoners && !recentSummoners.find(sum => sum.name === name && sum.region === region)) {
		recentSearch = [...recentSummoners, {name: name, region: region}];
	}

	localStorage.setItem('recent summoners', JSON.stringify(recentSearch));
}

export default pushNameInLS;