const checkNanAndDoubleZero = (num) => {
	if (num === '0.0' || isNaN(num)) return 0;

	return num;
}

const checkThousand = (num) => {
	if (num >= 1000) return (num / 1000).toFixed(3);

	return num;
}

export {checkNanAndDoubleZero, checkThousand};