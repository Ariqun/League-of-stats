import React from 'react';

import TextInputBlock, { InputTypes } from '../inputs/TextInputBlock';
import cl from './Filter.module.sass';

const Filter: React.FC<FilterProps> = ({ value, onChange, placeholder }) => {
  const filterField: InputTypes[] = [
    {
      name: 'filter', type: 'text', value, onChange, placeholder,
    },
  ];

  return (
    <div className={cl.filter}>
      <TextInputBlock fields={filterField} />
    </div>
  );
};

type FilterProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

export default Filter;
