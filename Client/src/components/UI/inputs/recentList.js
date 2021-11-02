import React from 'react';
import { Link } from 'react-router-dom';

const RecentList = ({ recent, isShow }) => {
  if (!recent) return null;

  const recentSummoners = JSON.parse(localStorage.getItem('recent summoners')).reverse();
  if (!recentSummoners) return null;

  const className = isShow ? 'recent_search col-6 col-sm-6 col-md-5 col-lg-4 col-xl-3' : 'hidden';

  const recentList = recentSummoners.map((summoner, i) => {
    if (i > 5) return null;

    const { name, region } = summoner;

    return (
      <Link to={`/summoner/${region}/${name}`} key={`${name}_${region}`}>
        {name}
      </Link>
    );
  });

  return (
    <div className={className}>
      {recentList}
    </div>
  );
};

export default RecentList;
