import React from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import { motion } from 'framer-motion';
import { useMapStore } from '../../context/MapContext';
import { useDataStore } from '../../context/DataContext';
import RouteLayer from './RouteLayer';

const token = process.env.REACT_APP_MAPBOX_TOKEN || '';

const LiveMap = () => {
  const { viewport, route, mapStyle } = useMapStore();
  const { bins } = useDataStore();

  return (
    <div className="h-[420px] overflow-hidden rounded-2xl border border-white/10">
      <Map initialViewState={viewport} mapboxAccessToken={token} mapStyle={mapStyle} reuseMaps>
        <NavigationControl position="top-right" />
        <RouteLayer route={route} />
        {bins.map((bin) => (
          <Marker key={bin.id} longitude={bin.lng} latitude={bin.lat} anchor="bottom">
            <motion.div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-nexus-warning/80" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.6, repeat: Infinity }}>
              <span className="absolute h-6 w-6 animate-pulseRing rounded-full border border-nexus-eco" />
              <span className="h-2 w-2 rounded-full bg-white" />
            </motion.div>
          </Marker>
        ))}
      </Map>
    </div>
  );
};

export default LiveMap;
