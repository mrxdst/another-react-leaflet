import L from 'leaflet';
import { useEffect } from 'react';
import { getDefaultOptions } from '../util';
import { EventedProps } from './useEvented';
import { useLayer } from './useLayer';

export function useMarker(instance: L.Marker | undefined, latlng: L.LatLngExpression, options: L.MarkerOptions & EventedProps): void {
  useLayer(instance, options);

  useEffect(() => {
    instance?.setLatLng(latlng);
  }, [instance, latlng]);

  useEffect(() => {
    instance?.setZIndexOffset(options.zIndexOffset ?? getDefaultOptions(instance).zIndexOffset);
  }, [instance, options.zIndexOffset]);

  useEffect(() => {
    instance?.setIcon(options.icon ?? getDefaultOptions(instance).icon);
  }, [instance, options.icon]);

  useEffect(() => {
    instance?.setOpacity(options.opacity ?? getDefaultOptions(instance).opacity);
  }, [instance, options.opacity]);
}