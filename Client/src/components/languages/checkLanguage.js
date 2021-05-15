const checkLanguage = () => {
	let lang = '';

	if (navigator.languages && navigator.languages.length) {
		lang = navigator.languages[0];
	} else if (navigator.userLanguage) {
		lang = navigator.userLanguage;
	} else {
		lang = navigator.language;
	}

	const result = lang.replace(/-/g, '_');

	return result;
}

export default checkLanguage;