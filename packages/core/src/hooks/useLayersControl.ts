import L from 'leaflet';
import { useControl } from './useControl';

export function useLayersControl(instance: L.Control.Layers | undefined, options: L.Control.LayersOptions): void {
  useControl(instance, options);
}