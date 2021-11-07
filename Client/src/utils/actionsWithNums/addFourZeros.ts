const addFourZeros = (num: number | string): string => {
  const arr = String(num).split('');

  if (arr.length < 4) {
    for (let i = arr.length; i < 4; i++) {
      arr.unshift('0');
    }
  }

  return arr.join('');
};

export default addFourZeros;
