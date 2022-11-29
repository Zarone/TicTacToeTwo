import styles from './Button.module.css';
import { FC } from 'react';

export const Button: FC<
  Partial<HTMLButtonElement> & {
    type: 'button';
    onClick: () => void;
    text: string;
  }
> = ({ type, text, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={
        styles.buttonInput + ' ' + (disabled ? styles.buttonDisabled : ' ')
      }
    >
      {text}
    </button>
  );
};
