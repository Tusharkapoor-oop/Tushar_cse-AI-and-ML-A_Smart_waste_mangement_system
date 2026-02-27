import React from 'react';
import { Layer, Source } from 'react-map-gl';

const RouteLayer = ({ route }) => {
  const geojson = {
    type: 'Feature',
    properties: {},
    geometry: { type: 'LineString', coordinates: route }
  };

  return (
    <Source id="ga-route" type="geojson" data={geojson}>
      <Layer
        id="ga-route-line"
        type="line"
        paint={{
          'line-width': 5,
          'line-color': '#2df6a4',
          'line-opacity': 0.8,
          'line-blur': 0.6
        }}
      />
    </Source>
  );
};

export default RouteLayer;
