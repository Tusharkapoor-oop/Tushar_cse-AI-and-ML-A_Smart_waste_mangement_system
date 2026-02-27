import { create } from 'zustand';
import { GURUGRAM_CENTER, GA_ROUTE } from '../utils/constants';

export const useMapStore = create((set) => ({
  viewport: GURUGRAM_CENTER,
  route: GA_ROUTE,
  selectedBin: null,
  mapStyle: 'mapbox://styles/mapbox/dark-v11',
  setViewport: (viewport) => set({ viewport }),
  setSelectedBin: (selectedBin) => set({ selectedBin }),
  setMapStyle: (mapStyle) => set({ mapStyle })
}));
