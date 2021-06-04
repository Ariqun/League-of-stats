const checkLanguage = () => {
	let lang = '';

	if (navigator.languages && navigator.languages.length) {
		lang = navigator.languages[0];
	} else if (navigator.userLanguage) {
		lang = navigator.userLanguage;
	} else {
		lang = navigator.language;
	}

	let result = lang.split(/[-_]/g);

	return result[0];
}

export default checkLanguage;