const scorePerMin = (score, ms, fix = 0) => (score / ((ms / (1000 * 60)))).toFixed(fix);

export { scorePerMin };
