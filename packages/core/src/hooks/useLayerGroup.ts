import L from 'leaflet';
import { EventedProps } from './useEvented';
import { useLayer } from './useLayer';

export function useLayerGroup(instance: L.LayerGroup | undefined, options: L.LayerOptions & EventedProps): void {
  useLayer(instance, options);
}