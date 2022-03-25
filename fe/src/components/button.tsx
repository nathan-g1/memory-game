import React from 'react';

interface Props {
  text: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({ text, className, onClick, disabled }) => {
  return <button disabled={disabled} onClick={onClick} className={`${className} ${disabled ? `cursor-not-allowed` : 'cursor-pointer'}`}>{text}</button>;
};

export default Button;
