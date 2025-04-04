import cn from 'classnames';
import { ReactNode } from 'react';

import * as styles from './Button.module.scss';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  isRight?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
  const { children, className = '', isRight = false, disabled = false, onClick } = props;

  return (
    <button
      className={cn(styles.button, { [styles.button_right]: isRight }, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
