const scorePerMin = (score, dur) => {
	return (score / ((dur / (1000*60)))).toFixed(1);
}

export default scorePerMin;