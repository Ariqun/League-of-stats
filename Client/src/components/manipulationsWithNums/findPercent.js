const findPercent = (value, total, fix = 0) => {
	if (value === 0 && total === 0) return 0;

	return ((value * 100) / total).toFixed(fix);
}

export {findPercent}