import cn from 'classnames';
import { ReactNode } from 'react';

import * as styles from './Button.module.scss';

interface ButtonProps {
  children: ReactNode;
  isRight?: boolean;
  isHidden?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
  const {
    children,
    isRight = false,
    isHidden = false,
    disabled = false,
    className,
    onClick,
  } = props;

  return (
    <button
      className={cn(styles.button, className, {
        [styles.button_right]: isRight,
        [styles.button_hidden]: isHidden,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
