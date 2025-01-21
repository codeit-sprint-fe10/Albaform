'use client';

import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';

type GoogleMapProps = { lat: number; lng: number };

const GoogleMap = ({ lat, lng }: GoogleMapProps) => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        defaultZoom={12}
        defaultCenter={{ lat: lat, lng: lng }}
        mapId={uuidv4()}
      >
        <AdvancedMarker position={{ lat: lat, lng: lng }} />
      </Map>
    </APIProvider>
  );
};

export default GoogleMap;
