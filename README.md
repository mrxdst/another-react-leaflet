# another-react-leaflet

[![npm](https://img.shields.io/npm/v/another-react-leaflet)](https://www.npmjs.com/package/another-react-leaflet)

Another react leaflet library.


## Install

`npm install --save another-react-leaflet leaflet`

If using typescript also install `@types/leaflet`.


## Usage

### Create React App

```ts
// setupLeaflet.ts

import L from 'leaflet';

// Import leaflet css
import 'leaflet/dist/leaflet.css';

// Import icons so that they are bundled.
import MarkerIcon from 'leaflet/dist/images/marker-icon.png';
import MarkerIcon2 from 'leaflet/dist/images/marker-icon-2x.png';
import MarkerShadow from 'leaflet/dist/images/marker-shadow.png';

// Disable auto detection. And update the urls.
// https://leafletjs.com/reference.html#icon-default-option
L.Icon.Default.prototype.options.imagePath = ' ';
L.Icon.Default.prototype.options.iconRetinaUrl = MarkerIcon2;
L.Icon.Default.prototype.options.iconUrl = MarkerIcon;
L.Icon.Default.prototype.options.shadowUrl = MarkerShadow;
```

```tsx
// MapView.tsx

import React from 'react';
import './setupLeaflet'; // Only needs to be imported once per app.
import { MapContainer, Marker, ScaleControl, TileLayer, Tooltip } from 'another-react-leaflet';

export function MapView() {
  return (
    <MapContainer zoom={3} center={[0, 0]}>

      <ScaleControl/>
      
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

      <Marker latlng={[0, 0]}>
        <Tooltip>
          <h1>Hello!</h1>
        </Tooltip>
      </Marker>

    </MapContainer>
  );
}
```

## Plugins

 * [markercluster](https://github.com/mrxdst/another-react-leaflet/tree/master/packages/markercluster)