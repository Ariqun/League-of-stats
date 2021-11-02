import React from 'react';

import cl from './SelectBlock.module.sass';

const SelectBlock: React.FC<SelectBlockProps> = ({
  select, className = '',
}) => (
  <select
    name={select.name}
    value={select.value}
    onChange={select.onChange}
    className={`${cl.select} ${className}`}
  >
    {select.options.map((option) => (
      <option value={option.value} key={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export type SelectTypes = {
  name: string;
  value: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  disabled?: boolean;
};

type SelectBlockProps = {
  select: SelectTypes;
  className?: string;
};

export default SelectBlock;
