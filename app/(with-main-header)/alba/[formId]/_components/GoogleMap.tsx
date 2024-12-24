'use client';

import React from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

type GoogleMapProps = { lat: number; lng: number };

const GoogleMap = ({ lat, lng }: GoogleMapProps) => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  return (
    <APIProvider apiKey={API_KEY}>
      <Map zoom={12} center={{ lat: lat, lng: lng }}>
        <Marker position={{ lat: lat, lng: lng }} />
      </Map>
    </APIProvider>
  );
};

export default GoogleMap;
