import { useEffect, useState } from 'react';

import { YearItem } from '@/entities/Year';
import { useDataStore } from '@/shared/stores/dataStore';

import * as styles from './TimelineYears.module.scss';

interface TimelineYearsProps {
  sliderId: string;
}

export const TimelineYears = (props: TimelineYearsProps) => {
  const { sliderId } = props;

  const { sliders } = useDataStore((state) => state);

  const [isLoading, setIsLoading] = useState(true);
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    const slider = sliders[sliderId];
    if (slider && slider.length > 0) {
      const extractedYears = slider[0].events.map((event) => event.year);

      const minYear = Math.min(...extractedYears);
      const maxYear = Math.max(...extractedYears);
      setYears([minYear, maxYear]);

      setIsLoading(false);
    }
  }, [sliders, sliderId]);

  if (isLoading) {
    return null;
  }

  return (
    <div className={styles.timeline__years}>
      {years.map((year, index) => (
        <YearItem key={index} year={year} color={index === 1 ? 'fuschia' : undefined} />
      ))}
    </div>
  );
};
