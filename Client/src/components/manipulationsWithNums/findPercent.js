const findPercent = (value, total, fix = 0) => {
	return ((value * 100) / total).toFixed(fix);
}

export {findPercent}