import { Routes, Route } from 'react-router-dom';

import { Home } from '@/pages/Home';

import * as styles from './App.module.scss';

export const App = () => {
  return (
    <div className={styles.page}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};
