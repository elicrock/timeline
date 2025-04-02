import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { DataSchema } from '../types/data';

export const useDataStore = create<DataSchema>()(
  immer(
    devtools((set) => ({
      sliders: {},
      currentYearIndex: 0,
      setDataStore: (id, data) =>
        set((state) => {
          state.sliders[id] = data;
        }),
      setCurrentYearIndex: (index) =>
        set((state) => {
          state.currentYearIndex = index;
        }),
    })),
  ),
);
