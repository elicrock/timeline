import { data } from '@/shared/const/data';
import { dataSecond } from '@/shared/const/dataSecond';
import { Timeline } from '@/widgets/Timeline';

import * as styles from './Home.module.scss';

export const Home = () => {
  return (
    <main className={styles.main}>
      <Timeline data={data} sliderId="slider1" />
      <Timeline data={dataSecond} sliderId="slider2" />
    </main>
  );
};
