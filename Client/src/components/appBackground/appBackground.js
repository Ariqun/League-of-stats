import React, {Component} from 'react';

export default class AppBackground extends Component {
	render() {
		return (
			<video preload="auto" autoPlay loop muted="muted">
				<source src={process.env.PUBLIC_URL + '/assets/img/diana.webm'} type='video/webm; codecs="vp8, vorbis"'/>
			</video>
		)
	}
}