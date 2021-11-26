import { EventedProps, useLayerGroup } from 'another-react-leaflet';
import L from 'leaflet';

export function useMarkerClusterGroup(instance: L.MarkerClusterGroup | undefined, options: L.MarkerClusterGroupOptions & EventedProps): void {
  useLayerGroup(instance, options);
}