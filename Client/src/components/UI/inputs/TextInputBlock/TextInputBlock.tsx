import React from 'react';

import cl from './TextInputBlock.module.sass';

const TextInputBlock: React.FC<TextInputBlockProps> = ({
  fields, className = '',
}) => (
  <div className={cl.block}>
    {fields.map((field) => (
      <input
        {...field}
        className={`${cl.field} ${className}`}
        key={field.name}
      />
    ))}
  </div>
);

export type InputTypes = {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: 'text' | 'password' | 'email';
  placeholder?: string;
  disabled?: boolean;
  autoComplete?: 'on' | 'off' | undefined;
};

type TextInputBlockProps = {
  fields: InputTypes[];
  className?: string;
};

export default TextInputBlock;
