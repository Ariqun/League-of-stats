import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Canvas from '../../../../components/сanvases/teamGraphCanvas';
import TotalTeamScore from './totalTeamScore';
import graphInfo from './graphInfo';

import './index.sass';

const TeamGraphs = ({ info, version }) => {
  const { participants } = info;
  const leftTeamInfo = graphInfo(100, participants, version);
  const rightTeamInfo = graphInfo(200, participants, version);
  const [t] = useTranslation();

  return (
    <div className="graphs">
      <div className="graph graph_damage">
        <span className="graph_title">{t('dmgToChamps')}</span>
        <TotalTeamScore leftTeam={leftTeamInfo} rightTeam={rightTeamInfo} type="dmg" />
        <Canvas leftTeam={leftTeamInfo} rightTeam={rightTeamInfo} type="dmg" />
      </div>

      <div className="graph graph_heal">
        <span className="graph_title">{t('healOnAllies')}</span>
        <TotalTeamScore leftTeam={leftTeamInfo} rightTeam={rightTeamInfo} type="heal" />
        <Canvas leftTeam={leftTeamInfo} rightTeam={rightTeamInfo} type="heal" />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ version: state.version });

export default connect(mapStateToProps)(TeamGraphs);
