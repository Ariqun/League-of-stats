import React from 'react';

import cl from './Roles.module.sass';

const Roles: React.FC<RolesProps> = ({ shownRoles, toggleVision }) => {
  const roles = ['Assassin', 'Fighter', 'Mage', 'Marksman', 'Support', 'Tank'];

  return (
    <div className={`${cl.roles} col-10 col-sm-6`}>
      {roles.map((role) => {
			  const className = shownRoles.includes(role) ? cl.role : `${cl.role} ${cl.inactive}`;

			  return (
  <div
    onClick={() => toggleVision(role)}
    className={className}
    key={role}
  >
    <img
      src={`${process.env.PUBLIC_URL}/assets/icons/roles/${role}.png`}
      alt={role}
      title={role}
    />
  </div>
			  );
      })}
    </div>
  );
};

type RolesProps = {
  shownRoles: string[];
  toggleVision: (role: string) => void;
};

export default Roles;
