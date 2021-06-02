import React, {Component} from 'react';

export default class Canvas extends Component {
	constructor(props) {
		super(props);
		this.canvas = React.createRef();
	}

	componentDidMount() {
		this.verticalGraph();
	}

	verticalGraph() {
		const {leftTeam, rightTeam, type} = this.props;
		const ctx = this.canvas.current.getContext('2d');
		const allScore = [];
		let factor = 110;

		for (let i = 0; i < 5; i++) {
			allScore.push(leftTeam[i][type].total, rightTeam[i][type].total);
		}

		const maxScore = Math.max(...allScore) / 1000;
		if (maxScore > 3) factor = 50
		if (maxScore > 5) factor = 30
		if (maxScore > 10) factor = 20
		if (maxScore > 15) factor = 14
		if (maxScore > 25) factor = 10;
		if (maxScore > 35) factor = 7;
		if (maxScore > 50) factor = 5;
		if (maxScore > 70) factor = 2.5;
		
		function createCanvas(team, color, j = 0) {
			ctx.fillStyle = color;
			
			for (let i = 0; i < 5; i++) {
				const img = new Image();
				const num = team[i][type].total / 1000;

				img.src = team[i].champ;
				img.width = '20px';
				
				ctx.transform(1, 0, 0, -1, 0, 410);
				ctx.fillRect(i * 50 + j, 52, 40, num * factor);
				ctx.resetTransform();
				ctx.drawImage(img, i * 50 + j, 360, 40, 40);
			}

			ctx.fillStyle = 'white';
			ctx.font = "15px Beaufort for LoL, sans-serif";

			for (let i = 0; i < 5; i++) {
				const num = team[i][type].total / 1000;
				let score = `${num.toFixed(1)}k`;

				if (num < 10) score = `${num.toFixed(2)}k`;
				if (num < 0.1) score = '';

				ctx.fillText(score, i * 50 + 2 + j, 350 - num * factor);
			}
		}
		createCanvas(leftTeam, '#2a98bf');
		createCanvas(rightTeam, '#ff5859', 250);
	}

	render() {
		return(
			<canvas id="damage" width="490px" height="400px" ref={this.canvas}></canvas>
		)
	}
}