const checkNanAndDoubleZero = (num) => {
	if (num === '0.0' || isNaN(num)) return 0;

	return num;
}

const checkBigNums = (num, format = 'literal') => {
	const milliard = 1000000000;
	const million = 1000000;
	const thousand = 1000;

	if (num >= milliard) return `${(num / milliard).toFixed(1)}kkk`;
	if (num >= million) return `${(num / million).toFixed(3)}kk`;
	if (num >= thousand) return `${(num / thousand).toFixed(1)}k`;

	if (format === 'digits' && num >= thousand) return (num / thousand).toFixed(3);

	return num;
}

export {checkNanAndDoubleZero, checkBigNums};