import React, { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';

import TableResult from './components/tableResult';
import TeamGraphs from './components/teamGraphs';
import PlayersStatistics from './components/playersStatistics';
import { LoadingPage } from '../../components/Loading';
import DataBase from '../../services/dataBase';

const Match = ({ region, matchId }) => {
  const [info, setInfo] = useState({});
  const [isLoading, changeLoading] = useState(true);

  useEffect(() => {
    const getInfo = async () => {
      const db = new DataBase();
      const res = await db.getMatchInfo(matchId, region);

      setInfo(res);
      changeLoading(false);
    };
    getInfo();
  }, [matchId, region]);

  if (isLoading) return <LoadingPage />;

  return (
    <div className="match_page">
      <div className="container-xxl">
        <TableResult info={info} region={region} />
        <TeamGraphs info={info} />
        <PlayersStatistics info={info} />
      </div>

      <ReactTooltip id="tooltip" html />
    </div>
  );
};

export default Match;
