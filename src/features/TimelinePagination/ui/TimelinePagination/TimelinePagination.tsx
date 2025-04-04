import cn from 'classnames';

import { useDataStore } from '@/shared/stores/dataStore';

import * as styles from './TimelinePagination.module.scss';

interface TimelinePaginationProps {
  sliderId: string;
}

export const TimelinePagination = (props: TimelinePaginationProps) => {
  const { sliderId } = props;

  const { sliders, currentYearIndexes } = useDataStore((state) => state);

  const categories = sliders[sliderId] || [];

  return (
    <div className={styles.pagination}>
      {categories.map((_, index) => (
        <button
          key={index}
          className={cn(styles.pagination__item, {
            [styles.pagination__item_active]: index === (currentYearIndexes[sliderId] ?? 0),
          })}
        />
      ))}
    </div>
  );
};
