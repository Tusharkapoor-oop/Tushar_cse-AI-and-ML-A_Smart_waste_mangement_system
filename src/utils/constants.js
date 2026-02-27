export const GURUGRAM_CENTER = {
  latitude: 28.4229,
  longitude: 77.0419,
  zoom: 12.4,
  pitch: 50,
  bearing: 18
};

export const WASTE_BINS = [
  { id: 'BIN-GGM-101', type: 'Plastic', fill: 82, predictedFill: 94, lat: 28.4208, lng: 77.0397, area: 'Sohna Road', integrity: 0.95 },
  { id: 'BIN-GGM-116', type: 'Organic', fill: 57, predictedFill: 71, lat: 28.4375, lng: 77.0557, area: 'Sector 47', integrity: 0.92 },
  { id: 'BIN-GGM-118', type: 'Metal', fill: 36, predictedFill: 54, lat: 28.4582, lng: 77.0721, area: 'Golf Course Ext', integrity: 0.98 },
  { id: 'BIN-GGM-130', type: 'Plastic', fill: 91, predictedFill: 99, lat: 28.4097, lng: 77.0428, area: 'Badshahpur', integrity: 0.9 }
];

export const LSTM_FORECAST = [
  { time: '06:00', actual: 21, predicted: 24 },
  { time: '09:00', actual: 34, predicted: 37 },
  { time: '12:00', actual: 52, predicted: 57 },
  { time: '15:00', actual: 66, predicted: 72 },
  { time: '18:00', actual: 81, predicted: 87 },
  { time: '21:00', actual: 74, predicted: 79 }
];

export const GA_ROUTE = [
  [77.0397, 28.4208],
  [77.0428, 28.4097],
  [77.0557, 28.4375],
  [77.0721, 28.4582]
];

export const APP_STATS = {
  wasteKg: 2840,
  carbonSavedKg: 852,
  overflowingBins: 2,
  ecoCreditsIssued: 11890,
  aiConfidence: 97.1
};
