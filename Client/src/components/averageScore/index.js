import checkNum from "../chekNum";

const averageScore = (score, total, fix = 0) => {
	const result = checkNum((score / total).toFixed(fix));

	return result;
}

export default averageScore;