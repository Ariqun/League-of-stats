import React from 'react';
import { connect } from 'react-redux';

const SkillList = ({ spells, changeCurrentSkill, version }) => {
  const content = (id, name, url) => {
    const className = id === 'passive' ? 'passive' : 'skill';

    return (
      <div onClick={() => changeCurrentSkill(id)} className={className} key={id}>
        <div className="wrapper_for_horizontal_borders">
          <div className="wrapper_for_vertical_borders">
            <img src={url} alt={name} />
          </div>
        </div>
      </div>
    );
  };

  const result = spells.map((spell) => {
    const { id, name, image } = spell;
    let url = `http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${image.full}`;

    if (id === 'passive') url = `http://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${image.full}`;

    return content(id, name, url);
  });

  return result;
};

const mapStateToProps = (state) => ({ version: state.version });

export default connect(mapStateToProps)(SkillList);
