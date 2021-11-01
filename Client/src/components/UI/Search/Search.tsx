import React, { useState } from 'react';

import { InputTypes } from '../inputs/TextInputBlock';
import cl from './Search.module.sass';

const Search: React.FC<SearchProps> = ({ onChange, placeholder, recent = null}) => {
	return(
		<div className={cl.search}>
			<input
				onChange={onChange}
				className={`${cl.skyblue_search} col-6 col-sm-6 col-md-5 col-lg-4 col-xl-3`}
				type="text"
				placeholder={placeholder}
			/>
		</div>
	)
}

type SearchProps = {
	onChange: () => void;
	placeholder: string;
	recent?: string[] | null;
}

export default Search;