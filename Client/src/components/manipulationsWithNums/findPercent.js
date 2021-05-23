const findPercent = (value, total, fix = 0) => {
	if ((value === 0 && total === 0) || (value !== 0 && total === 0)) return 0;
	if (value === 0 && total !== 0) return 100;

	return ((value * 100) / total).toFixed(fix);
}

export {findPercent}