const removeTags = (str: string): string => {
  const result = str.replace(/<.+>/gi, ' ');

  return result;
};

export default removeTags;
