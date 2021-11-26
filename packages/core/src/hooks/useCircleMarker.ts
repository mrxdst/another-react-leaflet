import L from 'leaflet';
import { useEffect } from 'react';
import { getDefaultOptions } from '../util';
import { EventedProps } from './useEvented';
import { usePath } from './usePath';

export function useCircleMarker(instance: L.CircleMarker | undefined, latlng: L.LatLngExpression, options: L.CircleMarkerOptions & EventedProps): void {
  usePath(instance, options);

  useEffect(() => {
    instance?.setLatLng(latlng);
  }, [instance, latlng]);

  useEffect(() => {
    instance?.setRadius(options.radius ?? getDefaultOptions(instance).radius);
  }, [instance, options.radius]);
}
