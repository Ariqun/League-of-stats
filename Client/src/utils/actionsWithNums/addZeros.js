const addZero = (num) => {
	if ((num + '').length <= 1) return `0${num}`;
	
	return num;
}

const addZeroFour = (num) => {
	const arr = num.split('');

	if (arr.length < 4) {
		for (let i = arr.length; i < 4; i++) {
			arr.unshift('0');
		}
	}

	return arr.join('');
}

export {addZero, addZeroFour};