import React, { useState } from 'react';
import {useTranslation} from 'react-i18next';

import Main from '../../layouts/Main';
import Container from '../../layouts/Container';
import Roles from './Roles';
import Filter from '../../ui/Filter';
import Champions from './Champions';
import useInput from '../../../hooks/useInput';

const Home: React.FC = () => {
	const [shownRoles, changeShownRoles] = useState(['Assassin', 'Fighter', 'Mage', 'Marksman', 'Support', 'Tank']);
	const [inputValue, setInputValue] = useInput('');
	const [t] = useTranslation();

	const toggleVision = (role: string) => {
		if (shownRoles.includes(role)) {
			const filteredRoles = shownRoles.filter(item => item !== role);
			changeShownRoles([...filteredRoles]);
		} else {
			changeShownRoles([...shownRoles, role]);
		}
	}

	return (
		<Main>
			<Container>
				<Roles shownRoles={shownRoles} toggleVision={toggleVision}/>

				<Filter value={inputValue} onChange={setInputValue} placeholder={t("startWriteChampName")} />

				<Champions inputValue={inputValue} shownRoles={shownRoles}/>
			</Container>
		</Main>
	);
};

export default Home;