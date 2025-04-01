import { Dot } from '@/entities/Dot';

import * as styles from './TimelineCircle.module.scss';

const RADIUS = 265;

export const TimelineCircle = () => {
  return (
    <div className={styles.timeline__circle}>
      <div className={styles.timeline__circle_circle}>
        {[...Array(6)].map((_, index) => {
          const angle = (360 / 6) * index;

          return (
            <Dot key={index} number={index + 1} title="asfasf" angle={angle} radius={RADIUS} />
          );
        })}
      </div>
    </div>
  );
};
