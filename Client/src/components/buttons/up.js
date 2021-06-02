import React, {useState} from 'react';

const Up = () => {
	const [scrollTop, changeScrollTop] = useState(0);
	const className = scrollTop >= 700 ? "up" : "up invisible";

	setInterval(() => {
		changeScrollTop(window.pageYOffset);
	}, 1000);
	
	const scrollUp = () => {
		let count = window.pageYOffset;

		const interval = setInterval(() => {
			if (count <= 0) clearInterval(interval);

			window.scrollTo(0, count);
			count -= 50;
		}, 1)
	}

	return(
		<div className={className} onClick={() => scrollUp()}>
			<img src={process.env.PUBLIC_URL + '/assets/icons/up.png'} alt="up"/>
		</div>
	)
}

export default Up;