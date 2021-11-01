const modifyChampName = (str) => {
	if (str !== 'FiddleSticks') return str;

	const result = str.toLowerCase().replace(/\w/, (match) => {
		return match.toUpperCase();
	});

	return result;
}

export {modifyChampName};