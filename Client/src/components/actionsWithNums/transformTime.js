import {addZero} from "./addZeros";

const transformMS = (ms, format = 'literal') => {
	const seconds = addZero(Math.floor((ms / 1000) % 60));
	const minutes = addZero(Math.floor((ms / (1000 * 60)) % 60));
	const hours = addZero(Math.floor((ms / (1000 * 60 * 60)) % 60));

	if (ms >= 3600000 && format === 'literal') return `${hours}ч. ${minutes}м. ${seconds}с.`
	if (ms >= 3600000 && format === 'digits') return `${hours}:${minutes}:${seconds}`
	
	if (format === 'literal') return `${minutes}м. ${seconds}с.`;
	if (format === 'digits') return `${minutes}:${seconds}`;
}

const transformSeconds = (sec) => {
	const seconds = Math.floor(sec % 60);
	const minutes = Math.floor((sec / 60) % 60);

	return `${minutes}м. ${seconds}с.`;
}

const transformDate = (ms, full = false) => {
	const date = new Date(ms);

	const day = addZero(date.getDate());
	const months = addZero(date.getMonth() + 1);
	const year = addZero(date.getFullYear());
	const hours = addZero(date.getHours());
	const minutes = addZero(date.getMinutes());

	let result = `${day}.${months}.${year}`;
	if (full) result = `${result} ${hours}:${minutes}`;

	return result;
}


export {transformMS, transformSeconds, transformDate};