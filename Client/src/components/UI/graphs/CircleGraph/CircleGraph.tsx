import React, { useEffect, useRef } from 'react';

import findPercent from '../../../../utils/actionsWithNums/findPercent';
import cl from './CircleGraph.module.sass';

const CircleGraph: React.FC<CircleGraphProps> = ({
  primary, secondary, width, height, mode,
}) => {
 	const canvasFront = useRef<HTMLCanvasElement>(null!);
 	const canvasBack = useRef<HTMLCanvasElement>(null!);
 	const canvasBorder = useRef<HTMLCanvasElement>(null!);
  const percent = findPercent(primary, primary + secondary, 1);

  useEffect(() => {
    const ctxFront = canvasFront.current.getContext('2d');
    const ctxBack = canvasBack.current.getContext('2d');
    const ctxBorder = canvasBack.current.getContext('2d');

    if (!ctxFront || !ctxBack || !ctxBorder) return;

    const percent = +findPercent(primary, primary + secondary, 2) / 100;
    const degrees = percent * 360;
    const result = degrees * (Math.PI / 180);
    let radians = 0.01;

    const progress = setInterval(() => {
      radians += 0.015;

      if (radians >= result) clearInterval(progress);

      ctxFront.clearRect(0, 0, +width, +height);
      ctxFront.strokeStyle = 'green';
      ctxFront.rotate(-90 * Math.PI / 180);
      ctxFront.beginPath();
      ctxFront.arc(-100, 100, 80, 0, radians, false);
      ctxFront.lineWidth = 8;
      ctxFront.stroke();
    });

    ctxBack.strokeStyle = 'rgba(111, 111, 111, 0.3)';
    ctxBack.beginPath();
    ctxBack.arc(100, 100, 80, 0, Math.PI * 2, false);
    ctxBack.lineWidth = 8;
    ctxBack.closePath();
    ctxBack.stroke();

    ctxBorder.strokeStyle = 'deepskyblue';
    ctxBorder.beginPath();
    ctxBorder.arc(100, 100, 87, 0, Math.PI * 2, false);
    ctxBorder.lineWidth = 1.5;
    ctxBorder.closePath();
    ctxBorder.stroke();
  }, [primary, secondary, width, height, mode]);

  return (
    <div className={cl.graph}>
      <canvas ref={canvasFront} id={cl.front} width={width} height={height} />

      <div className={cl.stats}>
        <span className={mode === 'hidden' ? cl.hidden : cl.primary}>
          {primary}
        </span>

        <span className={cl.percent}>
          {percent}%
        </span>

        <span className={mode === 'hidden' ? cl.hidden : cl.secondary}>
          {secondary}
        </span>
      </div>

      <canvas ref={canvasBack} id={cl.back} width={width} height={height} />
      <canvas ref={canvasBorder} id={cl.border} width={width} height={height} />
    </div>
  );
};

type CircleGraphProps = {
  primary: number;
  secondary: number;
  width: string;
  height: string;
  mode: 'hidden' | undefined;
};

export default CircleGraph;
