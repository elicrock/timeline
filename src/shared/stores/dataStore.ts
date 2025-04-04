import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { DataSchema } from '../types/data';

export const useDataStore = create<DataSchema>()(
  immer(
    devtools((set) => ({
      sliders: {},
      currentYearIndexes: {},
      isCompleteAnimationCircles: {},

      setDataStore: (id, data) =>
        set((state) => {
          state.sliders[id] = data;
        }),
      setCurrentYearIndex: (id, index) =>
        set((state) => {
          state.currentYearIndexes[id] = index;
        }),
      setIsCompleteAnimationCircle: (id, value) =>
        set((state) => {
          state.isCompleteAnimationCircles[id] = value;
        }),
    })),
  ),
);
