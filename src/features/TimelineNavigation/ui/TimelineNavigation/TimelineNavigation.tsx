import ArrowSvg from '@/shared/assets/svg/arrow-icon.svg';
import { useDataStore } from '@/shared/stores/dataStore';
import { Button } from '@/shared/ui/Button';

import * as styles from './TimelineNavigation.module.scss';

interface TimelineNavigationProps {
  sliderId: string;
}

export const TimelineNavigation = (props: TimelineNavigationProps) => {
  const { sliderId } = props;

  const { sliders, currentYearIndexes, setCurrentYearIndex } = useDataStore((state) => state);
  const sliderData = sliders[sliderId] || [];
  const currentYearIndex = currentYearIndexes[sliderId] ?? 0;

  return (
    <div className={styles.navigation}>
      <div className={styles.navigation__counter}>
        {currentYearIndex + 1 < 10 ? `0${currentYearIndex + 1}` : currentYearIndex + 1}/
        {sliderData.length < 10 ? `0${sliderData.length}` : sliderData.length}
      </div>
      <div className={styles.navigation__buttons}>
        <Button
          onClick={() => setCurrentYearIndex(sliderId, currentYearIndex - 1)}
          disabled={currentYearIndex === 0}
          className={styles.navigation__button}
        >
          <ArrowSvg />
        </Button>
        <Button
          isRight
          onClick={() => setCurrentYearIndex(sliderId, currentYearIndex + 1)}
          disabled={currentYearIndex === sliderData.length - 1}
          className={styles.navigation__button}
        >
          <ArrowSvg />
        </Button>
      </div>
    </div>
  );
};
