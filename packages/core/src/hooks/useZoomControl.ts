import L from 'leaflet';
import { useControl } from './useControl';

export function useZoomControl(instance: L.Control.Zoom | undefined, options: L.Control.ZoomOptions): void {
  useControl(instance, options);
}