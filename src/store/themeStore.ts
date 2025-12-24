import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeMode, ThemeState } from '@/types';

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'light' as ThemeMode,
      toggle: () =>
        set((state) => ({
          mode: state.mode === 'light' ? 'dark' : 'light',
        })),
      setMode: (mode: ThemeMode) => set({ mode }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

