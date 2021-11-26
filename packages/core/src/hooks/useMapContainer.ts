import L from 'leaflet';
import { EventedProps, useEvented } from './useEvented';

export function useMapContainer(instance: L.Map | undefined, options: L.MapOptions & EventedProps): void {
  useEvented(instance, options);
}