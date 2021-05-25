module.exports =  (first, second) => {
	if (second === 0) second = 1;

	return +(first / second).toFixed(1);
}