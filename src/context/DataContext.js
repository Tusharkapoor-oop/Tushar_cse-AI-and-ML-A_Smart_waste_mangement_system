import { create } from 'zustand';
import { APP_STATS, WASTE_BINS } from '../utils/constants';

export const useDataStore = create((set) => ({
  bins: WASTE_BINS,
  stats: APP_STATS,
  language: localStorage.getItem('ecosphere.lang') || 'en',
  mode: localStorage.getItem('ecosphere.mode') || 'neon',
  updateBins: (bins) => set({ bins }),
  setLanguage: (language) => {
    localStorage.setItem('ecosphere.lang', language);
    set({ language });
  },
  setMode: (mode) => {
    localStorage.setItem('ecosphere.mode', mode);
    set({ mode });
  }
}));
