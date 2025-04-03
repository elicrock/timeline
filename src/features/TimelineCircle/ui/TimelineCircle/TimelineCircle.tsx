import { gsap } from 'gsap';
import { useLayoutEffect, useRef } from 'react';

import { DotItem } from '@/entities/Dot';
import { useDataStore } from '@/shared/stores/dataStore';

import { circleAnimation } from '../../lib/timelineCircleAnimations';
import { CIRTCLE_RADIUS } from '../../model/const/timelineCircleConst';

import * as styles from './TimelineCircle.module.scss';

interface TimelineCircleProps {
  sliderId: string;
}

export const TimelineCircle = (props: TimelineCircleProps) => {
  const { sliderId } = props;

  const { sliders, currentYearIndex, setCurrentYearIndex, setIsCompleteAnimationCircle } =
    useDataStore((state) => state);

  const circleRef = useRef<HTMLDivElement | null>(null);
  const ctxGsap = useRef<gsap.Context | null>(null);

  const sliderData = sliders[sliderId];

  useLayoutEffect(() => {
    if (!sliderData || !circleRef.current) return;

    const totalDots = sliderData.length;

    if (totalDots === 0) return;

    circleAnimation({
      ctxGsap,
      circleRef,
      totalDots,
      currentYearIndex,
      onComplete: () => setIsCompleteAnimationCircle(true),
    });
  }, [currentYearIndex, sliderData]);

  useLayoutEffect(() => {
    ctxGsap.current = gsap.context(() => {});

    return () => ctxGsap.current?.revert();
  }, []);

  if (!sliderData) return null;

  const totalDots = sliderData.length;

  return (
    <div className={styles.timeline__circle}>
      <div ref={circleRef} className={styles.timeline__circle_circle}>
        {sliderData.map((category, index) => {
          const angle = (index / totalDots) * 2 * Math.PI - Math.PI / 3;

          return (
            <DotItem
              key={`${sliderId}-${category.id}`}
              number={index + 1}
              title={category.category}
              angle={angle}
              radius={CIRTCLE_RADIUS}
              totalDots={totalDots}
              isActive={index === currentYearIndex}
              onClick={() => setCurrentYearIndex(index)}
            />
          );
        })}
      </div>
    </div>
  );
};
