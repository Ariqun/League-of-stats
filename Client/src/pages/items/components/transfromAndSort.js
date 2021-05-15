const transformAndSort = (obj) => {
	let result = Object.keys(obj).map(key => {
		return obj[key];
	})

	result.sort((a, b) => {
		return a.gold.total - b.gold.total;
	})

	return result;
}

export default transformAndSort;