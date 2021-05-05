import {checkNanAndDoubleZero} from "../chekNums";

const averageScore = (score, total, fix = 0) => {
	const result = checkNanAndDoubleZero((score / total).toFixed(fix));

	return result;
}

export default averageScore;