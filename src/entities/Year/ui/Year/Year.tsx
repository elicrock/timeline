import cn from 'classnames';

import * as styles from './Year.module.scss';

type YearColor = 'iris' | 'fuschia';

interface YearProps {
  year: number;
  color?: YearColor;
  className?: string;
}

export const Year = (props: YearProps) => {
  const { year, color = 'iris', className } = props;
  return <span className={cn(styles.timeline__year, styles[color], className)}>{year}</span>;
};
