import cn from 'classnames';

import * as styles from './YearItem.module.scss';

type YearColor = 'iris' | 'fuschia';

interface YearProps {
  year: number;
  color?: YearColor;
  className?: string;
}

export const YearItem = (props: YearProps) => {
  const { year, color = 'iris', className } = props;
  return <span className={cn(styles.timeline__year, styles[color], className)}>{year}</span>;
};
