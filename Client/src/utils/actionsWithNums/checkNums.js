const checkNanAndDoubleZero = (num) => {
  if (num === '0.0' || isNaN(num)) return 0;

  return num;
};

const checkBigNum = (num, format = 'literal') => {
  const milliard = 1000000000;
  const million = 1000000;
  const thousand = 1000;

  if (num >= milliard) return `${(num / milliard).toFixed(1)}kkk`;
  if (num >= million) return `${(num / million).toFixed(3)}kk`;
  if (num >= thousand) return `${(num / thousand).toFixed(1)}k`;

  if (format === 'digits' && num >= thousand) return (num / thousand).toFixed(3);

  return num;
};

const separateNumWithDot = (number) => {
  const num = Math.floor(number);

  if (num >= 1000 && num % 10 === 0) return `${num / 1000}0`;

  return num / 1000;
};

export { checkNanAndDoubleZero, checkBigNum, separateNumWithDot };
