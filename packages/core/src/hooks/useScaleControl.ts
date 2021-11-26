import L from 'leaflet';
import { useControl } from './useControl';

export function useScaleControl(instance: L.Control.Scale | undefined, options: L.Control.ScaleOptions): void {
  useControl(instance, options);
}