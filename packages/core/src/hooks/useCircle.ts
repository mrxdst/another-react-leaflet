import L from 'leaflet';
import { EventedProps } from './useEvented';
import { useCircleMarker } from './useCircleMarker';

export function useCircle(instance: L.Circle | undefined, latlng: L.LatLngExpression, options: L.CircleMarkerOptions & EventedProps): void {
  useCircleMarker(instance, latlng, options);
}