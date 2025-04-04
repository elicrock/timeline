import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import { EventItem } from '@/entities/Event';
import ArrowSvgSm from '@/shared/assets/svg/arrow-icon_sm.svg';
import { useDataStore } from '@/shared/stores/dataStore';
import { Button } from '@/shared/ui/Button';

import { BREAKPOINTS } from '../../model/const/timelineEvents';
import { SliderPositionTypes } from '../../model/types/timelineEvents';

import * as styles from './TimelineEventsSlider.module.scss';

interface TimelineEventsSliderProps {
  sliderId: string;
}

export const TimelineEventsSlider = (props: TimelineEventsSliderProps) => {
  const { sliderId } = props;

  const swiperRef = useRef<SwiperType | null>(null);

  const [sliderPosition, setSliderPosition] = useState<SliderPositionTypes>(
    SliderPositionTypes.beginning,
  );

  const { sliders, currentYearIndexes, isCompleteAnimationCircles } = useDataStore(
    (state) => state,
  );

  const sliderData = sliders[sliderId] || [];
  const currentYearIndex = currentYearIndexes[sliderId] ?? 0;
  const selectedCategory = sliderData[currentYearIndex] || { events: [] };

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
    }
  }, [currentYearIndex]);

  return (
    <div
      className={cn(styles.events__slider, {
        [styles.events__slider_active]: isCompleteAnimationCircles[sliderId],
        [styles.events__slider_notActive]: !isCompleteAnimationCircles[sliderId],
      })}
    >
      <Button
        className={cn('swiper-button-prev', styles.events__slider__button)}
        isHidden={sliderPosition === SliderPositionTypes.beginning}
      >
        <ArrowSvgSm />
      </Button>
      <Swiper
        id={sliderId}
        modules={[Navigation]}
        slidesPerView={3}
        breakpoints={BREAKPOINTS}
        spaceBetween={30}
        grabCursor
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onReachBeginning={() => setSliderPosition(SliderPositionTypes.beginning)}
        onFromEdge={() => setSliderPosition(SliderPositionTypes.edge)}
        onReachEnd={() => setSliderPosition(SliderPositionTypes.end)}
        className={styles.events__slider__swiper}
      >
        {selectedCategory.events.map((event, eventIndex) => (
          <SwiperSlide key={eventIndex}>
            <EventItem title={event.year.toString()} description={event.description} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Button
        className={cn('swiper-button-next', styles.events__slider__button)}
        isHidden={sliderPosition === SliderPositionTypes.end}
        isRight
      >
        <ArrowSvgSm />
      </Button>
    </div>
  );
};
