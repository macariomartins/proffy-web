import React, { TextareaHTMLAttributes } from 'react';

import './styles.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}

const Textarea = ({ name, label, ...props }: TextareaProps) => {
  return (
    <div className="textarea-block">
      <label htmlFor={name}>{label}</label>
      <textarea id={name} {...props} />
    </div>
  );
}

export default Textarea;
