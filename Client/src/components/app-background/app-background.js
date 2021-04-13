import React from 'react';

const AppBackground = () => {
	return (
		<video preload="auto" autoPlay={true} loop={true} muted="muted">
			<source src="/assets/img/diana.webm" type='video/webm; codecs="vp8, vorbis"'/>
		</video>
	)
}

export default AppBackground