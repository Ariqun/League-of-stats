import React from 'react';

import Roles from './Roles';
import Stats from './Stats';
import championStore from '../../../../stores/championStore';
import cl from './General.module.sass';

const General: React.FC = () => {
  const {
    championInfo: {
      id, name, title, lore, stats, tags,
    },
  } = championStore;

  return (
    <div className={cl.general}>
      <div className={`${cl.image} col-sm-3`}>
        <img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${id}_0.jpg`} alt={`Art of ${id}`} />
      </div>

      <div className={cl.champion_info}>
        <div className={cl.title_wrapper}>
          <span className={cl.name}>{name}</span>
          <span className={cl.title}>{title}</span>
        </div>

        <div className={cl.lore}>
          <p>{lore}</p>
        </div>

        <Roles roles={tags} />
        <Stats stats={stats} />
      </div>
    </div>
  );
};

export default General;
