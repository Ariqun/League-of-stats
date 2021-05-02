const addZero = (num) => {
	const arr = num.split('');

	if (arr.length < 4) {
		for (let i = arr.length; i < 4; i++) {
			arr.unshift('0')
		}
	}

	return arr.join('')
}

export default addZero;