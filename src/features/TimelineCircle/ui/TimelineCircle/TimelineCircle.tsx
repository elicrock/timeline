import { gsap } from 'gsap';
import { useLayoutEffect, useMemo, useRef } from 'react';

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

  const { sliders, currentYearIndexes, setCurrentYearIndex, setIsCompleteAnimationCircle } =
    useDataStore((state) => state);

  const circleRef = useRef<HTMLDivElement | null>(null);
  const ctxGsap = useRef<gsap.Context | null>(null);

  const sliderData = sliders[sliderId];
  const currentYearIndex = currentYearIndexes[sliderId] ?? 0;

  const points = useMemo(() => {
    if (!sliderData) return [];
    return sliderData.map((category, index) => {
      const angle = (index / sliderData.length) * 2 * Math.PI - Math.PI / 3;
      return {
        category,
        angle,
        isActive: index === currentYearIndex,
      };
    });
  }, [sliderData, currentYearIndex]);

  useLayoutEffect(() => {
    if (sliderData && currentYearIndexes[sliderId] === undefined) {
      setCurrentYearIndex(sliderId, 0);
    }
  }, [sliderData, sliderId, currentYearIndexes, setCurrentYearIndex]);

  useLayoutEffect(() => {
    if (!sliderData || !circleRef.current) return;

    const totalDots = sliderData.length;

    if (totalDots === 0) return;

    circleAnimation({
      ctxGsap,
      circleRef,
      totalDots,
      currentYearIndex,
      onStart: () => setIsCompleteAnimationCircle(sliderId, false),
      onComplete: () => setIsCompleteAnimationCircle(sliderId, true),
    });
  }, [currentYearIndex, sliderData, sliderId]);

  useLayoutEffect(() => {
    ctxGsap.current = gsap.context(() => {});

    return () => ctxGsap.current?.revert();
  }, []);

  if (!sliderData) return null;

  return (
    <div className={styles.timeline__circle}>
      <div ref={circleRef} className={styles.timeline__circle_circle}>
        {points.map((point, index) => (
          <DotItem
            key={`${sliderId}-${point.category.id}`}
            number={index + 1}
            title={point.category.category}
            angle={point.angle}
            radius={CIRTCLE_RADIUS}
            totalDots={sliderData.length}
            isActive={point.isActive}
            sliderId={sliderId}
            onClick={() => setCurrentYearIndex(sliderId, index)}
          />
        ))}
      </div>
    </div>
  );
};
