import { useEffect, useState } from 'react';

import { YearItem } from '@/entities/Year';
import { useDataStore } from '@/shared/stores/dataStore';

import * as styles from './TimelineYears.module.scss';

interface TimelineYearsProps {
  sliderId: string;
}

export const TimelineYears = (props: TimelineYearsProps) => {
  const { sliderId } = props;

  const { sliders, currentYearIndexes } = useDataStore((state) => state);

  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    const slider = sliders[sliderId];
    const currentIndex = currentYearIndexes[sliderId] ?? 0;

    if (slider && slider[currentIndex]) {
      const extractedYears = slider[currentIndex].events.map((event) => event.year);
      const minYear = Math.min(...extractedYears);
      const maxYear = Math.max(...extractedYears);
      setYears([minYear, maxYear]);
    }
  }, [sliders, sliderId, currentYearIndexes[sliderId]]);

  if (years.length === 0) return null;

  return (
    <div className={styles.timeline__years}>
      {years.map((year, index) => (
        <YearItem key={index} year={year} color={index === 1 ? 'fuschia' : undefined} />
      ))}
    </div>
  );
};
