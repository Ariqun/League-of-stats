const modifyItemTags = (str) => {
	let result = str.replace(/<attention>(\s?\w+%?)<\/attention>|<ornnBonus>(\s?\w+%?)<\/ornnBonus>/gi, (match, m1, m2) => {
		let str = '';
		m1 ? str = m1 : str = m2;

		return `<span>+${str}</span>`;
	})

	result = result.replace(/<hr>/gi, '<br>');

	return result;
}

const modifyRuneTags = (str) => {
	let result = str.replace(/<b>(\W+)<\/b>|<attention>(\s?\w+%?)<\/attention>/gi, (match, m1, m2) => {
		let str = '';
		m1 ? str = m1 : str = m2;

		return `<span>${str}</span>`;
	})

	result = result.replace(/<hr>/gi, '<br>');

	return result;
}

export {modifyItemTags, modifyRuneTags};