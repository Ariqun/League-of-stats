import React from 'react';

function AppBackground() {
	return (
		<video id="video_back" preload="auto" autoPlay loop muted="muted">
			<source src={process.env.PUBLIC_URL + '/assets/img/diana.webm'} type='video/webm; codecs="vp8, vorbis"'/>
		</video>
	)
}

export default AppBackground;