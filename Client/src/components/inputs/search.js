import React, {useState} from 'react';

import RecentList from './recentList';
import './inputs.sass';

const Search = ({func, placeholder, recent = null}) => {
	const [isShowRecentList, setShowRecentList] = useState(false);

	const hideRecentList = () => {
		setTimeout(() => {
			setShowRecentList(false);
		}, 500)
	}

	return(
		<>
			<input 
				onChange={func}
				onClick={() => setShowRecentList(true)}
				onBlur={() => hideRecentList()}
				className="skyblue_search col-6 col-sm-6 col-md-5 col-lg-4 col-xl-3"
				type="text"
				placeholder={placeholder}
			/>
			<RecentList recent={recent} isShow={isShowRecentList}/>
		</>
	)
}

export default Search;