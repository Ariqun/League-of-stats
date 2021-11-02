const modifyChampName = (str) => {
  if (str !== 'FiddleSticks') return str;

  const result = str.toLowerCase().replace(/\w/, (match) => match.toUpperCase());

  return result;
};

export { modifyChampName };
