const modifyTags = (str, type) => {
	let result = str.replace(/<b>(\W+)<\/b>|<attention>(\s?\w+%?)<\/attention>|<ornnBonus>(\s?\w+%?)<\/ornnBonus>/gi, (match, m1, m2) => {
		let str = '';
		m1 ? str = m1 : str = m2;

		if (type === 'item') return `<span>+${str}</span>`;
		if (type === 'rune') return `<span>${str}</span>`;
	})

	result = result.replace(/<hr>/gi, '<br>');

	return result;
}

export default modifyTags;