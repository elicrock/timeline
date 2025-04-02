import { DotItem } from '@/entities/Dot';
import { useDataStore } from '@/shared/stores/dataStore';

import { CIRTCLE_RADIUS } from '../../model/const/timelineCircleConst';

import * as styles from './TimelineCircle.module.scss';

interface TimelineCircleProps {
  sliderId: string;
}

export const TimelineCircle = (props: TimelineCircleProps) => {
  const { sliderId } = props;

  const { sliders, currentYearIndex } = useDataStore((state) => state);

  const sliderData = sliders[sliderId];

  if (!sliderData) return null;

  const totalDots = sliderData.length;

  return (
    <div className={styles.timeline__circle}>
      <div className={styles.timeline__circle_circle}>
        {sliderData.map((category, index) => {
          const angle = (index / totalDots) * 2 * Math.PI - Math.PI / 3;

          return (
            <DotItem
              key={`${sliderId}-${category.id}`}
              number={index + 1}
              title={category.category}
              angle={angle}
              radius={CIRTCLE_RADIUS}
              isActive={index === currentYearIndex}
            />
          );
        })}
      </div>
    </div>
  );
};
