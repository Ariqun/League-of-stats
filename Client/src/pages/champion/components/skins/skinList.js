import React from 'react';

const SkinList = ({ id, skins, showModal }) => {
  const cards = skins.map((skin) => {
    const { num, name } = skin;

    if (num === 0) return null;

    return (
      <div className="skin_card col-5 col-sm-4 col-md-3" onClick={() => showModal(num)} key={num}>
        <div className="wrapper_for_horizontal_borders">
          <div className="wrapper_for_vertical_borders">
            <img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${id}_${num}.jpg`} alt={name} />
            <span className="skin_title">{name}</span>
          </div>
        </div>
      </div>
    );
  });

  return cards;
};

export default SkinList;
