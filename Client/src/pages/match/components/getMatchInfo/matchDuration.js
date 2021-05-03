import {addZero} from "../../../../components/addZeros";

const matchDuration = (time) => {
	const seconds = addZero(Math.floor(time / (1000) % 60));
	const minutes = addZero(Math.floor(time / (1000 * 60) % 60));
	const hours = addZero(Math.floor(time / (1000 * 60 * 60) % 24));

	if (time >= 3600000) {
		return `${hours}:${minutes}:${seconds}`
	} else {
		return `${minutes}:${seconds}`
	}
}

export default matchDuration;