import React from 'react';

import './loading.css';

const LoadingPage = () => {
	return(
		<div className="loading_page">
			<div className="container">
				<div className="spinner">
					<div/>
					<div/>
					<div/>
					<div/>
					<div/>
					<div/>
					<div/>
					<div/>
					<div/>
					<div/>
					<div/>
					<div/>
				</div>
			</div>
		</div>
	)
}

const LoadingBlock = () => {
	return(
		<div className="loading_block">
			<div className="spinner">
				<div/>
				<div/>
				<div/>
				<div/>
				<div/>
				<div/>
				<div/>
				<div/>
				<div/>
				<div/>
				<div/>
				<div/>
			</div>
		</div>
	)
}

export {LoadingPage, LoadingBlock}