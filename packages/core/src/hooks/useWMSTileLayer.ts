import L from 'leaflet';
import { EventedProps } from './useEvented';
import { useTileLayer } from './useTileLayer';

export function useWMSTileLayer(instance: L.TileLayer.WMS | undefined, baseUrl: string, options: L.WMSOptions & EventedProps): void {
  useTileLayer(instance, baseUrl, options);
}