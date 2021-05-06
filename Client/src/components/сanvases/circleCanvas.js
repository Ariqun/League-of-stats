import React, {Component} from 'react';

export default class CircleCanvas extends Component {
	constructor(props) {
		super(props);
		this.canvasFront = React.createRef();
		this.canvasBack = React.createRef();
	}

	componentDidMount() {
		this.updateCanvas();
	}

	updateCanvas = () => {
		const {primary, secondary} = this.props;
		const ctxFront = this.canvasFront.current.getContext('2d');
		
		const percent = (secondary * 100 / (primary + secondary)).toFixed(2) / 100;
		const degrees = percent * 360.0;
		const radians = degrees * (Math.PI / 180);

		ctxFront.strokeStyle = 'green';
		ctxFront.rotate(-90 * Math.PI / 180);
		ctxFront.beginPath();
		ctxFront.arc(-100, 100, 80, 0, radians, true);
		ctxFront.lineWidth = 8;
		ctxFront.stroke();

		const ctxBack = this.canvasBack.current.getContext('2d');
		ctxBack.strokeStyle = 'red';
		ctxBack.beginPath();
		ctxBack.arc(100, 100, 80, 0, Math.PI * 2, false);
		ctxBack.lineWidth = 7.5;
		ctxBack.closePath();
		ctxBack.stroke();
	}

	render() {
		const {width, height} = this.props;
		const {primary, secondary} = this.props;
		const percent = (primary * 100 / (primary + secondary)).toFixed(1);

		return(
			<div className="circle_canvas">
				<canvas id="front" width={width} height={height} ref={this.canvasFront}></canvas>
				<div className="stats">
					<span className="primary">{primary}</span>
					<span className="percent">{percent}%</span>
					<span className="secondary">{secondary}</span>
				</div>
				<canvas id="back" width={width} height={height} ref={this.canvasBack}></canvas>
			</div>
		)
	}
}