import {addZero} from "../../../../components/addZeros";

const matchStartDate = (time) => {
	const date = new Date(time);
	const transform = `
		${addZero(date.getDate())}.${addZero(date.getMonth() + 1)}.${addZero(date.getFullYear())} 
		${addZero(date.getHours())}:${addZero(date.getMinutes())}
	`;
	
	return transform;
}

export default matchStartDate;