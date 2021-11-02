const transformAndSort = (obj) => {
  const result = Object.keys(obj).map((key) => obj[key]);

  result.sort((a, b) => a.gold.total - b.gold.total);

  return result;
};

export default transformAndSort;
