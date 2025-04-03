import cn from 'classnames';
import { gsap } from 'gsap';
import { useLayoutEffect, useRef, useState } from 'react';

import { yearAnimation } from '../../lib/yearAnimation';

import * as styles from './YearItem.module.scss';

type YearColor = 'iris' | 'fuschia';

interface YearProps {
  year: number;
  color?: YearColor;
  className?: string;
}

export const YearItem = (props: YearProps) => {
  const { year, color = 'iris', className } = props;

  const [startYear] = useState(year);

  const yearRef = useRef<HTMLSpanElement | null>(null);
  const ctxGsap = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
    yearAnimation({ ctxGsap, yearRef, year });
  }, [year]);

  useLayoutEffect(() => {
    ctxGsap.current = gsap.context(() => {});

    return () => ctxGsap.current?.revert();
  }, []);

  return (
    <span ref={yearRef} className={cn(styles.timeline__year, styles[color], className)}>
      {startYear}
    </span>
  );
};
