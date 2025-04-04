import { useEffect } from 'react';

import { TimelineCircle } from '@/features/TimelineCircle';
import { TimelineEventsSlider } from '@/features/TimelineEvents';
import { TimelineNavigation } from '@/features/TimelineNavigation';
import { TimelinePagination } from '@/features/TimelinePagination';
import { TimelineYears } from '@/features/TimelineYears';
import { useDataStore } from '@/shared/stores/dataStore';
import { Data } from '@/shared/types/data';

import * as styles from './Timeline.module.scss';

interface TimelineProps {
  title?: string;
  data?: Data[];
  sliderId: string;
}

export const Timeline = (props: TimelineProps) => {
  const { title = 'Исторические даты', data, sliderId } = props;

  const { setDataStore } = useDataStore((state) => state);

  useEffect(() => {
    if (data) {
      setDataStore(sliderId, data);
    }
  }, [data]);

  if (!data) {
    return null;
  }

  return (
    <div className={styles.timeline}>
      <div className={styles.timeline__wrapper}>
        <h1 className={styles.timeline__title}>{title}</h1>
        <TimelineYears sliderId={sliderId} />
        <TimelineCircle sliderId={sliderId} />
        <TimelineNavigation sliderId={sliderId} />
      </div>
      <TimelineEventsSlider sliderId={sliderId} />
      <div className={styles.timeline__navigation_mobile}>
        <TimelineNavigation sliderId={sliderId} />
        <TimelinePagination sliderId={sliderId} />
      </div>
    </div>
  );
};
