import cn from 'classnames';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { EventItem } from '@/entities/Event';
import { useDataStore } from '@/shared/stores/dataStore';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import * as styles from './TimelineEventsSlider.module.scss';

interface TimelineEventsSliderProps {
  sliderId: string;
}

export const TimelineEventsSlider = (props: TimelineEventsSliderProps) => {
  const { sliderId } = props;

  const { sliders, currentYearIndexes, isCompleteAnimationCircles } = useDataStore(
    (state) => state,
  );

  const sliderData = sliders[sliderId] || [];
  const currentYearIndex = currentYearIndexes[sliderId] ?? 0;
  const selectedCategory = sliderData[currentYearIndex] || { events: [] };

  return (
    <div
      className={cn(styles.events__slider, {
        [styles.events__slider_active]: isCompleteAnimationCircles[sliderId],
        [styles.events__slider_notActive]: !isCompleteAnimationCircles[sliderId],
      })}
    >
      <Swiper
        id={sliderId}
        modules={[Navigation]}
        slidesPerView={3}
        spaceBetween={30}
        grabCursor
        navigation
      >
        {selectedCategory.events.map((event, eventIndex) => (
          <SwiperSlide key={eventIndex}>
            <EventItem title={event.year.toString()} description={event.description} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
