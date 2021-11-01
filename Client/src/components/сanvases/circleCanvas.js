import React, {useEffect, useRef} from 'react';

import {findPercent} from '../../utils/actionsWithNums/findPercent';
import './canvases.sass';

const CircleCanvas = ({primary, secondary, width, height, mode}) => {
 	const canvasFront = useRef();
 	const canvasBack = useRef();
 	const canvasBorder = useRef();
	const percent = findPercent(primary, primary + secondary, 1);

	useEffect(() => {
		const ctxFront = canvasFront.current.getContext('2d');
		const percent = findPercent(primary, primary + secondary, 2) / 100;
		const degrees = percent * 360;
		const result = degrees * (Math.PI / 180);
		let radians = 0.01;
		
		const progress = setInterval(() => {
			radians += 0.015;
			
			if (radians >= result) clearInterval(progress);

			ctxFront.clearRect(0, 0, width, height);
			ctxFront.strokeStyle = 'green';
			ctxFront.rotate(-90 * Math.PI / 180);
			ctxFront.beginPath();
			ctxFront.arc(-100, 100, 80, 0, radians, false);
			ctxFront.lineWidth = 8;
			ctxFront.stroke();
		})

		const ctxBack = canvasBack.current.getContext('2d');
		ctxBack.strokeStyle = 'rgba(111, 111, 111, 0.3)';
		ctxBack.beginPath();
		ctxBack.arc(100, 100, 80, 0, Math.PI * 2, false);
		ctxBack.lineWidth = 8;
		ctxBack.closePath();
		ctxBack.stroke();

		const ctxBorder = canvasBack.current.getContext('2d');
		ctxBorder.strokeStyle = 'deepskyblue';
		ctxBorder.beginPath();
		ctxBorder.arc(100, 100, 87, 0, Math.PI * 2, false);
		ctxBorder.lineWidth = 1.5;
		ctxBorder.closePath();
		ctxBorder.stroke();
	}, [primary, secondary, width, height, mode]);

	return(
		<div className="circle_canvas">
			<canvas ref={canvasFront} id="front" width={width} height={height} />

			<div className="canvas_stats">
				<span className={mode === 'hidden' ? "hidden" : "primary"}>{primary}</span>
				<span className="percent">{percent}%</span>
				<span className={mode === 'hidden' ? "hidden" : "secondary"}>{secondary}</span>
			</div>
			
			<canvas ref={canvasBack} id="back" width={width} height={height} />
			<canvas ref={canvasBorder} id="border" width={width} height={height} />
		</div>
	)
}

export default CircleCanvas;