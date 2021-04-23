import React, {Component} from 'react';

export default class Canvas extends Component {
	constructor(props) {
		super(props);
		this.canvas = React.createRef();
	}

	componentDidMount() {
		// this.horizontalGraph();
		this.verticalGraph();
	}

	horizontalGraph() {
		const {leftTeamDmg, rightTeamDmg} = this.props;
		const ctx = this.ctxDmg.current.getContext('2d');
		const allDmg = [];
		let factor = 10;

		for (let i = 0; i < 5; i++) {
			allDmg.push(leftTeamDmg[i].dmg, rightTeamDmg[i].dmg);
		}

		const maxDmg = Math.max(...allDmg);

		if (maxDmg > 35) {
			factor = 5;
		} else if (maxDmg > 70) {
			factor = 2.5;
		}
		
		function showIconsAndDmg(team, color, x = 0) {
			ctx.fillStyle = color;

			for (let i = 0; i < 5; i++) {
				const img = new Image();
				img.src = team[i].champ;
				img.width = '20px';

				ctx.drawImage(img, 0, i * 40 + x, 30, 30);
				ctx.fillRect(35, 2 + i*40 + x, (team[i].dmg) * factor, 26);
			}

			ctx.fillStyle = 'white';
			ctx.font = "15px Beaufort for LoL, sans-serif";
			for (let i = 0; i < 5; i++) {
				ctx.fillText(team[i].dmg, 45, i*40 + 20 + x);
			}
		}
		showIconsAndDmg(leftTeamDmg, '#2a98bf');
		showIconsAndDmg(rightTeamDmg, '#ff5859', 200);
	}

	verticalGraph() {
		const {leftTeam, rightTeam, option} = this.props;
		const ctx = this.canvas.current.getContext('2d');
		const allScore = [];
		let factor = 40;

		for (let i = 0; i < 5; i++) {
			allScore.push(leftTeam[i][option], rightTeam[i][option]);
		}

		const maxScore = Math.max(...allScore);

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
				img.src = team[i].champ;
				img.width = '20px';
				
				ctx.transform(1, 0, 0, -1, 0, 390);
				ctx.fillRect(0 + i * 40 + j, 32, 30, (team[i][option]) * factor);
				ctx.resetTransform();
				ctx.drawImage(img, i * 40 + j, 360, 30, 30);
			}

			ctx.fillStyle = 'white';
			ctx.font = "15px Beaufort for LoL, sans-serif";

			for (let i = 0; i < 5; i++) {
				const num = +team[i][option];
				let score = `${Math.floor(num)}k`;

				if(num < 10 && num > 0.1) score = `${num.toFixed(1)}k`;

				ctx.fillText(score, i * 40 + 2 + j, 350 - (team[i][option]) * factor);
			}
		}
		createCanvas(leftTeam, '#2a98bf');
		createCanvas(rightTeam, '#ff5859', 200);
	}

	render() {
		return(
			<canvas id="damage" width="390px" height="390px" ref={this.canvas}></canvas>
		)
	}
}