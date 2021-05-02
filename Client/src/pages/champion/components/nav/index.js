import React from 'react';

import NavList from './navList';

import './index.sass';

const Nav = ({changeTab}) => {
	return <NavList changeTab={changeTab}/>;
}

export default Nav;