import cn from 'classnames';
import { gsap } from 'gsap';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { dotAnimation } from '../../lib/dotAnimations';

import * as styles from './DotItem.module.scss';

interface DotProps {
  number: number;
  title: string;
  angle: number;
  radius: number;
  isActive: boolean;
  className?: string;
}

export const DotItem = (props: DotProps) => {
  const { number, title, angle, radius, isActive, className } = props;

  const [isHover, setIsHover] = useState(false);

  const dotRef = useRef<HTMLButtonElement | null>(null);
  const titleRef = useRef<HTMLSpanElement | null>(null);

  const ctxGsap = useRef<gsap.Context | null>(null);

  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);

  const onMouseEnter = () => {
    if (!isActive) setIsHover(true);
  };

  const onMouseLeave = () => {
    if (!isActive) setIsHover(false);
  };

  useEffect(() => {
    dotAnimation({ ctxGsap, dotRef, isNeedAnimate: isHover });
  }, [isHover]);

  useLayoutEffect(() => {
    ctxGsap.current = gsap.context(() => {}, dotRef);

    return () => ctxGsap.current?.revert();
  }, []);

  return (
    <button
      type="button"
      ref={dotRef}
      className={cn(styles.dot, className)}
      style={{ transform: `translate(${x}px, ${y}px) translate(-50%, -50%)` }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className={styles.dot__number}>{number}</span>
      <span ref={titleRef} className={styles.dot__title}>
        {title}
      </span>
    </button>
  );
};
