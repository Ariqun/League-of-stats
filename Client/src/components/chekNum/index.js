const checkNum = (num) => {
	if (num === '0.0' || isNaN(num)) {
		return 0;
	}

	return num;
}

export default checkNum;