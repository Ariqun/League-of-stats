const calcRatio = (first: number, second: number, fix = 0): string => {
  if (second === 0) second = 1;

  return (first / second).toFixed(fix);
};

export default calcRatio;
