import React, {Component} from 'react';

export default class AppBackground extends Component {
	render() {
		return (
			<video preload="auto" autoPlay={true} loop={true} muted="muted">
				<source src="/assets/img/diana.webm" type='video/webm; codecs="vp8, vorbis"'/>
			</video>
		)
	}
}