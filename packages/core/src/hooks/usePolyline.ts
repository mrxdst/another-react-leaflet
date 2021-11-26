import L from 'leaflet';
import { useEffect } from 'react';
import { EventedProps } from './useEvented';
import { usePath } from './usePath';

export function usePolyline(instance: L.Polyline | undefined, latlngs: L.LatLngExpression[] | L.LatLngExpression[][], options: L.PolylineOptions & EventedProps): void {
  usePath(instance, options);

  useEffect(() => {
    instance?.setLatLngs(latlngs);
  }, [instance, latlngs]);
}
