import React, {Component} from 'react';

export default class CircleCanvas extends Component {
	constructor(props) {
		super(props);
		this.canvasFront = React.createRef();
		this.canvasBack = React.createRef();
	}

	componentDidMount() {
		this.createCanvas();
	}

	createCanvas() {
		const {value, total} = this.props
		const ctxWins = this.canvasFront.current.getContext('2d');
		
		const percent = (value * 100 / total) / 100;
		const degrees = this.checkDeg((1 - percent).toFixed(2) * 360.0);
		const radians = degrees * (Math.PI / 180);

		ctxWins.strokeStyle = 'green';
		ctxWins.rotate(-90 * Math.PI / 180);
		ctxWins.beginPath();
		ctxWins.arc(-75, 75, 60, 0, radians, true);
		ctxWins.lineWidth = 8;
		ctxWins.stroke();

		const ctxBack = this.canvasBack.current.getContext('2d');
		ctxBack.strokeStyle = 'rgba(128, 128, 128, 0.5)';
		ctxBack.beginPath();
		ctxBack.arc(75, 75, 60, 0, Math.PI * 2, false);
		ctxBack.lineWidth = 7.5;
		ctxBack.closePath();
		ctxBack.stroke();
	}

	checkNum(num) {
		if (isNaN(num)) return '0.0';
		return num;
	}

	checkDeg(deg) {
		if (deg === 360) return 0;
		return deg;
	}

	render() {
		const {value, total, mode} = this.props;
		const percent = this.checkNum((value * 100 / total).toFixed(1));

		return(
			<div className="circle_graph">
				<canvas id={`${mode}_front`} className="front_circle" width="150px" height="150px" ref={this.canvasFront}></canvas>
				<div className="numbers">
					<span className="percent">{percent}%</span>
				</div>
				<canvas id={`${mode}_back`} width="150px" height="150px" ref={this.canvasBack}></canvas>
			</div>
		)
	}
}