const scorePerMin = (score, ms, fix = 0) => {
	return (score / ((ms / (1000 * 60)))).toFixed(fix);
}

export {scorePerMin};