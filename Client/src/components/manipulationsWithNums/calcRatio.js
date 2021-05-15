import {checkNanAndDoubleZero} from "./checkNums";

const calcRatio = (first, second, fix = 0) => {
	return checkNanAndDoubleZero((first / second).toFixed(fix));
}

export {calcRatio}