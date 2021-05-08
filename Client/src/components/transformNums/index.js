import {addZero} from "../addZeros";

const transformMS = (ms, format = 'literal') => {
	const seconds = addZero(Math.floor((ms / 1000) % 60));
	const minutes = addZero(Math.floor((ms / (1000 * 60)) % 60));

	if (format === 'literal') return `${minutes}м. ${seconds}с.`;
	if (format === 'digits') return `${minutes}:${seconds}`;
}

const transformSeconds = (sec) => {
	const seconds = Math.floor(sec % 60);
	const minutes = Math.floor((sec / 60) % 60);

	return `${minutes}м. ${seconds}с.`;
}

const transformDate = (ms) => {
	const date = new Date(ms);

	const day = addZero(date.getDate());
	const months = addZero(date.getMonth() - 1);
	const year = addZero(date.getFullYear());

	return `${day}.${months}.${year}`;
}


export {transformMS, transformSeconds, transformDate};