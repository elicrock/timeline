import cn from 'classnames';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { EventItem } from '@/entities/Event';
import { useDataStore } from '@/shared/stores/dataStore';

import * as styles from './TimelineEventsSlider.module.scss';

interface TimelineEventsSliderProps {
  sliderId: string;
}

export const TimelineEventsSlider = (props: TimelineEventsSliderProps) => {
  const { sliderId } = props;

  const { isCompleteAnimationCircles } = useDataStore((state) => state);

  return (
    <div
      className={cn(styles.events__slider, {
        [styles.events__slider_active]: isCompleteAnimationCircles[sliderId],
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
        {[...Array(4)].map((_, index) => (
          <SwiperSlide key={index}>
            <EventItem />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
