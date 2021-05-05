import {addZero} from "../addZeros";

const transformMS = (ms) => {
	const seconds = Math.floor(ms % 60);
	const minutes = Math.floor((ms / 60) % 60);

	return `${minutes}м. ${seconds}с.`;
}

const transformDate = (ms) => {
	const date = new Date(ms);

	const day = addZero(date.getDate());
	const months = addZero(date.getMonth() - 1);
	const year = addZero(date.getFullYear());

	return `${day}.${months}.${year}`;
}


export {transformMS, transformDate};