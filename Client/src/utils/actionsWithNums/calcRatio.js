import {checkNanAndDoubleZero} from "./checkNums";

const calcRatio = (first, second, fix = 0) => {
	if (second === 0) second = 1;

	return checkNanAndDoubleZero(+(first / second).toFixed(fix));
}

export {calcRatio};