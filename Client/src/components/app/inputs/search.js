import React from 'react';

import './inputs.sass';

const Search = ({func, placeholder}) => {
	return(
		<input onChange={func} className="skyblue_search col-3" type="text" placeholder={placeholder} />
	)
}

export default Search;