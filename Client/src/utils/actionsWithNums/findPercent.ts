const findPercent = (value: number, total: number, fix = 0) => {
  const isBothZero = value === 0 && total === 0;
  const isTotalZero = value !== 0 && total === 0;
  const isValueZero = value === 0 && total !== 0;

  if (isBothZero || isTotalZero || isValueZero) return 0;

  const percent = ((value * 100) / total).toFixed(fix);

  return percent;
};

export default findPercent;
