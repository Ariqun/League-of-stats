import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const ChampionBlock = ({
  inputValue, shownRoles, version, champions,
}) => {
  const champNames = [...Object.keys({ ...champions })];

  const champs = champNames.map((champ) => {
    const { key, name, tags } = champions[champ];
    const lowerName = name.toLowerCase();
    const lowerValue = inputValue.toLowerCase();
    let show = false;

    for (const elem of tags) {
      if (shownRoles.includes(elem) && lowerName.includes(lowerValue)) show = true;
    }

    if (!show) return null;

    return (
      <div className="champion" name={name} roles={tags} key={key}>
        <Link to={`/champion/${champ}`}>
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ}.png`}
            alt={name}
            title={name}
          />
        </Link>
      </div>
    );
  });

  return (
    <div className="champions col-12">
      {champs}
    </div>
  );
};

const mapStateToProps = (state) => ({
  version: state.version,
  champions: state.champions,
});

export default connect(mapStateToProps)(ChampionBlock);
