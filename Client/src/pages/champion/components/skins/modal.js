import React from 'react';

const Modal = ({id, num, hideModal}) => {
	return(
		<div className="skin_modal" onClick={hideModal}>
			<div className="modal_wrapper">
				<img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_${num}.jpg`} alt={`${id}_${num}`} />
			</div>
		</div>
	)
}

export default Modal;