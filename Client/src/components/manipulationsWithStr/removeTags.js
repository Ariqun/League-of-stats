const removeTags = (str) => {
	const result = str.replace(/<.+>/gi, ' ');

	return result;
}

export default removeTags;