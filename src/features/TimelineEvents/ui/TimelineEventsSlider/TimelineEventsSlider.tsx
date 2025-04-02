import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { EventItem } from '@/entities/Event';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

interface TimelineEventsSliderProps {
  sliderId: string;
}

export const TimelineEventsSlider = (props: TimelineEventsSliderProps) => {
  const { sliderId } = props;
  console.log('sliderId: ', sliderId);

  return (
    <div>
      <Swiper modules={[Navigation]} slidesPerView={3} spaceBetween={30} grabCursor navigation>
        {[...Array(4)].map((_, index) => (
          <SwiperSlide key={index}>
            <EventItem />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
