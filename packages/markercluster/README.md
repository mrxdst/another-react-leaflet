# another-react-leaflet-markercluster

[![npm](https://img.shields.io/npm/v/another-react-leaflet-markercluster)](https://www.npmjs.com/package/another-react-leaflet-markercluster)

Markercluster plugin for [another-react-leaflet](https://github.com/mrxdst/another-react-leaflet).


## Install

`npm install --save another-react-leaflet-markercluster leaflet.markercluster`

If using typescript also install `@types/leaflet.markercluster`.


## Usage

### Create React App

```ts
// setupMarkercluster.ts

// Import markercluster css
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
```

```tsx
// MapView.tsx

import React from 'react';
import './setupLeaflet'; // Only needs to be imported once per app.
import './setupMarkercluster'; // Only needs to be imported once per app.
import { MapContainer, Marker, ScaleControl, TileLayer, Tooltip } from 'another-react-leaflet';
import { MarkerClusterGroup } from 'another-react-leaflet-markercluster';

export function MapView() {
  return (
    <MapContainer zoom={3} center={[0, 0]}>

      <ScaleControl/>
      
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

      <MarkerClusterGroup>

        <Marker latlng={[0, 0]}>
          <Tooltip>
            <h1>Hello!</h1>
          </Tooltip>
        </Marker>

        <Marker latlng={[0, 1]}>
          <Tooltip>
            <h1>Hello!</h1>
          </Tooltip>
        </Marker>

      </MarkerClusterGroup>

    </MapContainer>
  );
}
```
