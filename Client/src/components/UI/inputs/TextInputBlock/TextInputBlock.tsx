import React from 'react';

import cl from './TextInputBlock.module.sass';

const TextInputBlock: React.FC<TextInputBlockProps> = ({
  fields, className = '',
}) => (
  <div className={`${cl.block} ${className}`}>
    {fields.map((field) => <input {...field}	className={cl.field} 	key={field.name} />)}
  </div>
);

export type InputTypes = {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: 'text' | 'password' | 'email';
  placeholder?: string;
  disabled?: boolean;
  autocomplete?: boolean;
};

type TextInputBlockProps = {
  fields: InputTypes[];
  title?: string;
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
};

export default TextInputBlock;
