const versionLoaded = (newVersion) => {
	return {
		type: 'VersionLoaded',
		loaded: newVersion
	};
};

export {
	versionLoaded
};