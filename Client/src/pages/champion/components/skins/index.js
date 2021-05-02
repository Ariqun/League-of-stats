import React, {useState} from 'react';

import Modal from './modal';
import SkinList from './skinList';

import './index.sass';

const Skins = ({champ}) => {
	const [show, toggleShow] = useState(false);
	const [num, setNum] = useState('');
	const {id, skins} = champ;
	let modal = '';

	const showModal = (num) => {
		toggleShow(true);
		setNum(num);
	}

	const hideModal = () => {
		toggleShow(false);
	}
	
	if (show) modal = <Modal id={id} num={num} hideModal={hideModal}/>;

	return(
		<div className="skins">
			<SkinList id={id} skins={skins} showModal={showModal}/>
			{modal}
		</div>
	)
}

export default Skins;