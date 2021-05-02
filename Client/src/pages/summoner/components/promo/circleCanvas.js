import React, {Component} from 'react';

export default class CircleCanvas extends Component {
	constructor(props) {
		super(props);
		this.canvasWins = React.createRef();
		this.canvasBack = React.createRef();
	}

	componentDidMount() {
		this.updateCanvas();
	}

	updateCanvas = () => {
		const {wins, losses} = this.props.ranked
		const ctxWins = this.canvasWins.current.getContext('2d');
		
		const percent = (losses * 100 / (wins + losses)).toFixed(2) / 100;
		const degrees = percent * 360.0;
		const radians = degrees * (Math.PI / 180);

		ctxWins.strokeStyle = 'green';
		ctxWins.rotate(-90 * Math.PI / 180);
		ctxWins.beginPath();
		ctxWins.arc(-100, 100, 80, 0, radians, true);
		ctxWins.lineWidth = 8;
		ctxWins.stroke();

		const ctxBack = this.canvasBack.current.getContext('2d');
		ctxBack.strokeStyle = 'red';
		ctxBack.beginPath();
		ctxBack.arc(100, 100, 80, 0, Math.PI * 2, false);
		ctxBack.lineWidth = 7.5;
		ctxBack.closePath();
		ctxBack.stroke();
	}

	render() {
		const {wins, losses} = this.props.ranked;
		const percent = (wins * 100 / (wins + losses)).toFixed(1);

		return(
			<div className="sum_winrate">
				<canvas id="winrate" width="200px" height="200px" ref={this.canvasWins}></canvas>
				<div className="stats">
					<span className="wins">{wins}</span>
					<span className="percent">{percent}%</span>
					<span className="losses">{losses}</span>
				</div>
				<canvas id="background" width="200px" height="200px" ref={this.canvasBack}></canvas>
			</div>
		)
	}
}