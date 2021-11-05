import React from 'react';

import cl from './Roles.module.sass';

const Roles: React.FC<RolesProps> = ({ roles }) => (
  <div className={cl.roles}>
    {roles.map((role) => (
      <div className={cl.role} key={role}>
        <img src={`${process.env.PUBLIC_URL}/assets/icons/roles/${role}.png`} alt={role} title={role} />
      </div>
    ))}
  </div>
);

type RolesProps = {
  roles: string[];
};

export default Roles;
