import L from 'leaflet';
import { useEffect } from 'react';
import { EventedProps } from './useEvented';
import { useLayer } from './useLayer';

export function useTileLayer(instance: L.TileLayer | undefined, urlTemplate: string, options: L.TileLayerOptions & EventedProps): void {
  useLayer(instance, options);

  useEffect(() => {
    instance?.setUrl(urlTemplate);
  }, [instance, urlTemplate]);
}