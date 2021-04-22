import React, {Component} from 'react';

export default class Canvas extends Component {
	constructor(props) {
		super(props);
		this.ctxDmg = React.createRef();
	}

	componentDidMount() {
		const {leftTeamDmg, rightTeamDmg} = this.props;
		const ctx = this.ctxDmg.current.getContext('2d');
		
		function showIconsAndDmg(team, color, x = 0) {
			ctx.fillStyle = color;

			for (let i = 0; i < 5; i++) {
				const img = new Image();

				img.src = team[i].champ;
				img.width = '20px';

				ctx.drawImage(img, 20, i * 40 + x, 30, 30);
				ctx.fillRect(60, 5 + i*40 + x, (team[i].dmg / 100000) * 500, 20);
			}

			ctx.fillStyle = 'black';
			ctx.font = "15px Beaufort for LoL, sans-serif";
			for (let i = 0; i < 5; i++) {
				ctx.fillText(team[i].dmg / 1000, 70, i*40 + 20 + x);
			}
		}
		showIconsAndDmg(leftTeamDmg, '#2a98bf');
		showIconsAndDmg(rightTeamDmg, '#ff5859', 200);
	}

	render() {
		return(
			<canvas id="damage" width="594px" height="400px" ref={this.ctxDmg}></canvas>
		)
	}
}