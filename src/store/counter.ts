import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface Count {
  count: number;
  increaseCount: () => void;
  resetCount: () => void;
}

export const useCounterStore = create<Count>()(
  devtools((set) => ({
    count: 0,
    increaseCount: () => {
      set(
        (state) => {
          return { count: state.count + 1 };
        },
        false,
        'increaseCount'
      );
    },
    resetCount: () => {
      set({ count: 0 }, false, 'resetCount');
    }
  }))
);
