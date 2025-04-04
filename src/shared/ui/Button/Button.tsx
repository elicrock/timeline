import cn from 'classnames';
import { ReactNode } from 'react';

import * as styles from './Button.module.scss';

interface ButtonProps {
  children: ReactNode;
  isRight?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
  const { children, isRight = false, disabled = false, className, onClick } = props;

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
