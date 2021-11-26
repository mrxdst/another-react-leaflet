import L from 'leaflet';
import { useEffect } from 'react';
import { EventedProps } from './useEvented';
import { usePath } from './usePath';

export function useRectangle(instance: L.Rectangle | undefined, latLngBounds: L.LatLngBoundsExpression, options: L.PolylineOptions & EventedProps): void {
  usePath(instance as unknown as L.Polygon, options);

  useEffect(() => {
    instance?.setBounds(latLngBounds);
  }, [instance, latLngBounds]);
}
