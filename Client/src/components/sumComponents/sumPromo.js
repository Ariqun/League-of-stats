import React, {Component} from 'react';

export default class SummonerPromo extends Component {
	constructor(props) {
		super(props);
		this.canvasWins = React.createRef();
		this.canvasBack = React.createRef();
	}

	componentDidMount() {
		this.updateCanvas();
	}

	updateCanvas = () => {
		const {wins, losses} = this.props.summoner.ranked
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

	createBannerBlock = ({summoner}) => {
		const {name, lvl, iconID} = summoner
		const version = this.props.version

		return(
			<div className="banner">
				<div className="icon">
					<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${iconID}.png`} alt="icon"/>
				</div>

				<div className="name_and_lvl">
					<div className="name">{name}</div>
					<div className="lvl">Уровень {lvl}</div>
				</div>
			</div>
		)
	}

	createRatingBlock = ({info}) => {
		const ruObj = {iron: 'Железо', bronze: 'Бронза', silver: 'Серебро', gold: 'Золото', platinum: 'Платина', diamond: 'Алмаз', master: 'Мастер', grandmaster: 'Грандмастер', challenger: 'Претендент'}
		const {tier, rank, leaguePoints} = info

		return(
			<div className="sum_rating">
				<div className="rank_block">
					<div className="rank_icon">
						<img src={`${process.env.PUBLIC_URL}/assets/icons/ranked/${tier}.png`} alt={`${tier}_emblem`}></img>
					</div>
					<span className="rank_name">{ruObj[tier.toLowerCase()]} {rank}</span>
					<span className="rank_lp">LP: &nbsp;{leaguePoints}</span>
				</div>
			</div>
		)
	}

	createWinRateBlock = ({info}) => {
		const {wins, losses} = info
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

	render() {
		const summoner = this.props.summoner
		const {ranked} = summoner

		return (
			<div className="promo">
				<this.createRatingBlock info={ranked}/>

				<this.createBannerBlock summoner={summoner}/>

				<this.createWinRateBlock info={ranked}/>
			</div>
		)
	}
}