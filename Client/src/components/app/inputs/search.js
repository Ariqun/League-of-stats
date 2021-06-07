import React from 'react';

import './inputs.sass';

const Search = ({func, placeholder}) => {
	return(
		<input 
			onChange={func}
			className="skyblue_search col-6 col-sm-6 col-md-5 col-lg-4 col-xl-3"
			type="text"
			placeholder={placeholder}
		/>
	)
}

export default Search;