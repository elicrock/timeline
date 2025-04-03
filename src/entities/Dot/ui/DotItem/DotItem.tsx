import cn from 'classnames';
import { gsap } from 'gsap';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { useDataStore } from '@/shared/stores/dataStore';

import { dotAnimation } from '../../lib/dotAnimations';

import * as styles from './DotItem.module.scss';

interface DotProps {
  number: number;
  title: string;
  angle: number;
  radius: number;
  totalDots: number;
  isActive: boolean;
  sliderId: string;
  className?: string;
  onClick?: () => void;
}

export const DotItem = (props: DotProps) => {
  const { number, title, angle, radius, totalDots, isActive, sliderId, className, onClick } = props;

  const { currentYearIndexes, isCompleteAnimationCircles } = useDataStore((state) => state);

  const [isHover, setIsHover] = useState(false);

  const dotRef = useRef<HTMLButtonElement | null>(null);

  const ctxGsap = useRef<gsap.Context | null>(null);

  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  const rotate = (360 / totalDots) * currentYearIndexes[sliderId];

  const onMouseEnter = () => {
    if (!isActive) setIsHover(true);
  };

  const onMouseLeave = () => {
    if (!isActive) setIsHover(false);
  };

  useEffect(() => {
    dotAnimation({ ctxGsap, dotRef, isNeedAnimate: isHover });
  }, [isHover]);

  useEffect(() => {
    dotAnimation({ ctxGsap, dotRef, isNeedAnimate: isActive });
  }, [isActive]);

  useLayoutEffect(() => {
    ctxGsap.current = gsap.context(() => {}, dotRef);

    return () => ctxGsap.current?.revert();
  }, []);

  return (
    <button
      type="button"
      ref={dotRef}
      className={cn(styles.dot, className)}
      style={{
        transform: `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${rotate}deg)`,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => {
        onClick?.();
        setIsHover(false);
      }}
    >
      <span className={styles.dot__number}>{number}</span>
      <span
        className={cn(styles.dot__title, {
          [styles.dot__title_active]: isActive && isCompleteAnimationCircles[sliderId],
          [styles.dot__title_notActive]: !isActive && isCompleteAnimationCircles[sliderId],
        })}
      >
        {title}
      </span>
    </button>
  );
};
